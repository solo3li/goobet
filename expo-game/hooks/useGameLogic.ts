import { useState, useCallback } from 'react';
import { API_BASE_URL } from '../config';
import { MULTIPLIERS } from '../constants';

export type GameState = 'IDLE' | 'PLAYING' | 'GAMEOVER';

// Re-export MULTIPLIERS so components that already import from here keep working
export { MULTIPLIERS };

const API_URL = `${API_BASE_URL}/api/game`;

export function useGameLogic(
  accountId: string,
  balance: number,
  onBalanceChange: (balance: number) => void,
  authToken: string
) {
  const [currentBet, setCurrentBet]     = useState<string>('1.00');
  const [gameState, setGameState]       = useState<GameState>('IDLE');
  const [activeRow, setActiveRow]       = useState<number>(0);
  const [gridData, setGridData]         = useState<string[][]>([]);
  const [revealedCells, setRevealedCells] = useState<boolean[][]>([]);
  const [winAmount, setWinAmount]       = useState<string>('0.00');
  const [showWinPopup, setShowWinPopup] = useState<boolean>(false);
  const [finalWin, setFinalWin]         = useState<string>('0.00');
  const [sessionId, setSessionId]       = useState<string>('');
  const [isLoading, setIsLoading]       = useState<boolean>(false);
  const [error, setError]               = useState<string | null>(null);

  // ─── Authenticated fetch helper ─────────────────────────────────
  const authFetch = useCallback(
    (url: string, body: object) =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      }),
    [authToken]
  );

  // ─── Create a fresh independent 2-D grid (no shared references) ─
  const makeEmptyGrid = (rows: number, cols: number, value: string): string[][] =>
    Array.from({ length: rows }, () => Array(cols).fill(value));

  const makeRevealedGrid = (rows: number, cols: number): boolean[][] =>
    Array.from({ length: rows }, () => Array(cols).fill(false));

  // ─── Reveal all cells at end of round ───────────────────────────
  const revealAll = useCallback((serverGrid: string[][]) => {
    setGridData(serverGrid);
    setRevealedCells(Array.from({ length: 10 }, () => Array(5).fill(true)));
  }, []);

  // ─── Start Game ─────────────────────────────────────────────────
  const startGame = useCallback(async () => {
    const bet = parseFloat(currentBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) return;
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await authFetch(`${API_URL}/start`, {
        betAmount: bet,
        playerId: accountId,
      });

      if (!response.ok) {
        const msg = await response.text();
        setError(msg || 'فشل تشغيل اللعبة');
        return;
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      // ✅ Use server balance (single source of truth)
      onBalanceChange(data.newBalance);
      setGameState('PLAYING');
      setActiveRow(0);
      setWinAmount('0.00');
      setShowWinPopup(false);
      // ✅ Fixed: use Array.from to avoid shared references
      setGridData(makeEmptyGrid(10, 5, 'unknown'));
      setRevealedCells(makeRevealedGrid(10, 5));
    } catch (err) {
      setError('تعذّر الاتصال بالخادم. تحقق من اتصالك.');
    } finally {
      setIsLoading(false);
    }
  }, [currentBet, balance, accountId, authFetch, isLoading]);

  // ─── Cashout ────────────────────────────────────────────────────
  const cashout = useCallback(
    async (forceAmount: string | null = null) => {
      if (gameState !== 'PLAYING') return;
      if (activeRow === 0 && forceAmount === null) return;
      if (isLoading) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await authFetch(`${API_URL}/cashout`, { sessionId });

        if (!response.ok) {
          setError('فشل عملية السحب');
          return;
        }

        const data = await response.json();

        // ✅ Use server balance
        onBalanceChange(data.newBalance);

        const amount =
          forceAmount ??
          (parseFloat(currentBet) * MULTIPLIERS[activeRow - 1]).toFixed(2);

        setFinalWin(amount);
        setShowWinPopup(true);
        setGameState('GAMEOVER');
        if (data.gridData) revealAll(data.gridData);

        setTimeout(() => setShowWinPopup(false), 2000);
      } catch {
        setError('تعذّر الاتصال بالخادم أثناء السحب.');
      } finally {
        setIsLoading(false);
      }
    },
    [gameState, activeRow, currentBet, sessionId, authFetch, revealAll, isLoading]
  );

  // ─── Handle Cell Click ──────────────────────────────────────────
  const handleCellClick = useCallback(
    async (r: number, c: number) => {
      if (gameState !== 'PLAYING') return;
      if (r !== activeRow) return;
      if (revealedCells[r]?.[c]) return;
      if (isLoading) return;

      setIsLoading(true);
      setError(null);
      try {
        const response = await authFetch(`${API_URL}/play`, {
          sessionId,
          row: r,
          col: c,
        });

        if (!response.ok) {
          setError('حدث خطأ أثناء اللعب');
          return;
        }

        const data = await response.json();

        if (data.status === 'won' || data.status === 'cashed_out') {
          // ✅ Fixed: proper immutable update (no shared references)
          setRevealedCells(prev => {
            const next = prev.map(row => [...row]);
            next[r][c] = true;
            return next;
          });
          setGridData(prev => {
            const next = prev.map(row => [...row]);
            next[r][c] = 'apple';
            return next;
          });

          setWinAmount(data.currentWin.toFixed(2));

          if (data.status === 'cashed_out') {
            setGameState('GAMEOVER');
            if (data.gridData) revealAll(data.gridData);
            // ✅ Use server balance
            onBalanceChange(data.newBalance);
            setFinalWin(data.currentWin.toFixed(2));
            setShowWinPopup(true);
            setTimeout(() => setShowWinPopup(false), 2000);
          } else {
            setActiveRow(data.activeRow);
          }
        } else if (data.status === 'lost') {
          setGameState('GAMEOVER');
          // ✅ Use server balance (unchanged on loss — bet already deducted at start)
          if (data.newBalance !== undefined) onBalanceChange(data.newBalance);
          revealAll(data.gridData);
        }
      } catch {
        setError('تعذّر الاتصال بالخادم. حاول مرة أخرى.');
      } finally {
        setIsLoading(false);
      }
    },
    [gameState, activeRow, revealedCells, sessionId, authFetch, revealAll, isLoading]
  );

  // ─── Modify Bet ─────────────────────────────────────────────────
  const modifyBet = useCallback(
    (type: 'MIN' | 'MAX' | 'X/2' | 'X2') => {
      let bet = parseFloat(currentBet) || 0;
      if (type === 'MIN')      bet = 1.0;
      else if (type === 'MAX') bet = balance;
      else if (type === 'X/2') bet = Math.max(1, bet / 2);
      else if (type === 'X2')  bet = Math.min(balance, bet * 2);
      setCurrentBet(bet.toFixed(2));
    },
    [currentBet, balance]
  );

  return {
    balance,
    currentBet,
    setCurrentBet,
    gameState,
    activeRow,
    gridData,
    revealedCells,
    winAmount,
    showWinPopup,
    finalWin,
    isLoading,
    error,
    startGame,
    cashout,
    handleCellClick,
    modifyBet,
  };
}

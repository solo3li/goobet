import { useState, useCallback } from 'react';

export type GameState = 'IDLE' | 'PLAYING' | 'GAMEOVER';

export const MULTIPLIERS = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68];
const API_URL = "http://178.62.192.74:8081/api/game";

export function useGameLogic(accountId: string, onBalanceChange: (balance: number) => void) {
  const [balance, setBalance] = useState<number>(10000.00);
  const [currentBet, setCurrentBet] = useState<string>('1.00');
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [activeRow, setActiveRow] = useState<number>(0);
  const [gridData, setGridData] = useState<string[][]>([]);
  const [revealedCells, setRevealedCells] = useState<boolean[][]>([]);
  const [winAmount, setWinAmount] = useState<string>('0.00');
  const [showWinPopup, setShowWinPopup] = useState<boolean>(false);
  const [finalWin, setFinalWin] = useState<string>('0.00');
  
  const [sessionId, setSessionId] = useState<string>('');

  const startGame = useCallback(async () => {
    const bet = parseFloat(currentBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) return;

    try {
      const response = await fetch(`${API_URL}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ betAmount: bet, playerId: accountId })
      });
      const data = await response.json();
      
      setSessionId(data.sessionId);
      setBalance(prev => {
        const newBalance = prev - bet;
        onBalanceChange(newBalance);
        return newBalance;
      });
      setGameState('PLAYING');
      setActiveRow(0);
      setWinAmount('0.00');
      setShowWinPopup(false);

      // Create an empty grid for the client
      const emptyData: string[][] = Array(10).fill(Array(5).fill('unknown'));
      const revealed: boolean[][] = Array(10).fill(Array(5).fill(false));
      setGridData(emptyData);
      setRevealedCells(revealed);
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  }, [currentBet, balance]);

  const revealAll = useCallback((serverGrid: string[][]) => {
    setGridData(serverGrid);
    setRevealedCells(prev => prev.map(row => row.map(() => true)));
  }, []);

  const cashout = useCallback(async (forceAmount: string | null = null) => {
    if (gameState !== 'PLAYING') return;
    if (activeRow === 0 && forceAmount === null) return;

    try {
      const response = await fetch(`${API_URL}/cashout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      const data = await response.json();

      let amount = forceAmount;
      if (amount === null) {
        amount = (parseFloat(currentBet) * MULTIPLIERS[activeRow - 1]).toFixed(2);
      }

      setBalance(prev => prev + parseFloat(amount!));
      setFinalWin(amount!);
      setShowWinPopup(true);
      setGameState('GAMEOVER');
      revealAll(data.gridData);

      setTimeout(() => {
        setShowWinPopup(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to cashout:", error);
    }
  }, [gameState, activeRow, currentBet, sessionId, revealAll]);

  const handleCellClick = useCallback(async (r: number, c: number) => {
    if (gameState !== 'PLAYING') return;
    if (r !== activeRow) return;
    if (revealedCells[r][c]) return;

    try {
      const response = await fetch(`${API_URL}/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, row: r, col: c })
      });
      const data = await response.json();

      if (data.status === 'won' || data.status === 'cashed_out') {
        setRevealedCells(prev => {
          const next = [...prev];
          next[r] = [...next[r]];
          next[r][c] = true;
          return next;
        });

        // The cell we clicked was an apple
        setGridData(prev => {
          const next = [...prev];
          next[r] = [...next[r]];
          next[r][c] = 'apple';
          return next;
        });

        setWinAmount(data.currentWin.toFixed(2));

        if (data.status === 'cashed_out') {
          setGameState('GAMEOVER');
          if (data.gridData) revealAll(data.gridData);
          setBalance(prev => prev + data.currentWin);
          setFinalWin(data.currentWin.toFixed(2));
          setShowWinPopup(true);
          setTimeout(() => setShowWinPopup(false), 2000);
        } else {
          setActiveRow(data.activeRow);
        }
      } else if (data.status === 'lost') {
        // We hit a core
        setGameState('GAMEOVER');
        revealAll(data.gridData);
      }
    } catch (error) {
      console.error("Failed to play cell:", error);
    }
  }, [gameState, activeRow, revealedCells, sessionId, cashout, revealAll]);

  const modifyBet = useCallback((type: 'MIN' | 'MAX' | 'X/2' | 'X2') => {
    let bet = parseFloat(currentBet) || 0;
    if (type === 'MIN') bet = 1.00;
    else if (type === 'MAX') bet = balance;
    else if (type === 'X/2') bet = Math.max(1, bet / 2);
    else if (type === 'X2') bet = Math.min(balance, bet * 2);
    setCurrentBet(bet.toFixed(2));
  }, [currentBet, balance]);

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
    startGame,
    cashout,
    handleCellClick,
    modifyBet
  };
}

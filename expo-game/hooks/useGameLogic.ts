import { useState, useCallback } from 'react';

export type GameState = 'IDLE' | 'PLAYING' | 'GAMEOVER';

export const MULTIPLIERS = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68];
export const CORES_PER_ROW = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

export function useGameLogic() {
  const [balance, setBalance] = useState<number>(10000.00);
  const [currentBet, setCurrentBet] = useState<string>('1.00');
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [activeRow, setActiveRow] = useState<number>(0);
  const [gridData, setGridData] = useState<string[][]>([]);
  const [revealedCells, setRevealedCells] = useState<boolean[][]>([]);
  const [winAmount, setWinAmount] = useState<string>('0.00');
  const [showWinPopup, setShowWinPopup] = useState<boolean>(false);
  const [finalWin, setFinalWin] = useState<string>('0.00');

  const generateGridData = useCallback(() => {
    const data: string[][] = [];
    const revealed: boolean[][] = [];
    for (let r = 0; r < 10; r++) {
      let rowCores = Array(5).fill('apple');
      let numCores = CORES_PER_ROW[r];
      let indices = [0, 1, 2, 3, 4];
      for (let i = 0; i < numCores; i++) {
        const randIdx = Math.floor(Math.random() * indices.length);
        const pos = indices.splice(randIdx, 1)[0];
        rowCores[pos] = 'core';
      }
      data[r] = rowCores;
      revealed[r] = Array(5).fill(false);
    }
    setGridData(data);
    setRevealedCells(revealed);
  }, []);

  const startGame = useCallback(() => {
    const bet = parseFloat(currentBet);
    if (isNaN(bet) || bet <= 0 || bet > balance) return;

    setBalance(prev => prev - bet);
    setGameState('PLAYING');
    setActiveRow(0);
    setWinAmount('0.00');
    setShowWinPopup(false);
    generateGridData();
  }, [currentBet, balance, generateGridData]);

  const revealAll = useCallback(() => {
    setRevealedCells(prev => prev.map(row => row.map(() => true)));
  }, []);

  const cashout = useCallback((forceAmount: string | null = null) => {
    if (gameState !== 'PLAYING') return;
    if (activeRow === 0 && forceAmount === null) return;

    let amount = forceAmount;
    if (amount === null) {
      amount = (parseFloat(currentBet) * MULTIPLIERS[activeRow - 1]).toFixed(2);
    }

    setBalance(prev => prev + parseFloat(amount!));
    setFinalWin(amount!);
    setShowWinPopup(true);
    setGameState('GAMEOVER');
    revealAll();

    setTimeout(() => {
      setShowWinPopup(false);
    }, 2000);
  }, [gameState, activeRow, currentBet, revealAll]);

  const handleCellClick = useCallback((r: number, c: number) => {
    if (gameState !== 'PLAYING') return;
    if (r !== activeRow) return;
    if (revealedCells[r][c]) return;

    const isCore = gridData[r][c] === 'core';

    setRevealedCells(prev => {
      const next = [...prev];
      next[r] = [...next[r]];
      next[r][c] = true;
      return next;
    });

    if (!isCore) {
      // Won
      const currentWin = (parseFloat(currentBet) * MULTIPLIERS[activeRow]).toFixed(2);
      setWinAmount(currentWin);

      if (activeRow === 9) {
        // Auto cashout at top
        setTimeout(() => cashout(currentWin), 500);
      } else {
        setActiveRow(prev => prev + 1);
      }
    } else {
      // Lose
      setGameState('GAMEOVER');
      revealAll();
    }
  }, [gameState, activeRow, revealedCells, gridData, currentBet, cashout, revealAll]);

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

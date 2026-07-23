import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Cell } from './Cell';

interface Props {
  gameState: 'IDLE' | 'PLAYING' | 'GAMEOVER';
  activeRow: number;
  gridData: string[][];
  revealedCells: boolean[][];
  onCellClick: (r: number, c: number) => void;
}

export function GameGrid({ gameState, activeRow, gridData, revealedCells, onCellClick }: Props) {
  const rows = [];
  for (let r = 9; r >= 0; r--) {
    const cols = [];
    for (let c = 0; c < 5; c++) {
      const isRevealed = revealedCells[r] ? revealedCells[r][c] : false;
      const isCore = gridData[r] ? gridData[r][c] === 'core' : false;
      const isActive = gameState === 'PLAYING' && r === activeRow && !isRevealed;

      cols.push(
        <Cell
          key={`${r}-${c}`}
          isRevealed={isRevealed}
          isActive={isActive}
          isCore={isCore}
          onPress={() => onCellClick(r, c)}
        />
      );
    }
    rows.push(
      <View key={r} style={styles.row}>
        {cols}
      </View>
    );
  }

  return <View style={styles.grid}>{rows}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 4, // RN supports gap
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  }
});

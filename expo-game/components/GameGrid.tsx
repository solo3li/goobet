import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Cell } from './Cell';

interface Props {
  gameState: 'IDLE' | 'PLAYING' | 'GAMEOVER';
  activeRow: number;
  gridData: string[][];
  revealedCells: boolean[][];
  onCellClick: (r: number, c: number) => void;
}

export function GameGrid({ gameState, activeRow, gridData, revealedCells, onCellClick }: Props) {
  const [rowHeight, setRowHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  // The gap between rows
  const GAP = 4;

  useEffect(() => {
    // When activeRow changes, slide the grid down.
    // We only slide down if we're in PLAYING state and advancing, or reset if activeRow is 0.
    const slideAmount = activeRow * (rowHeight + GAP);
    Animated.timing(translateY, {
      toValue: slideAmount,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [activeRow, rowHeight, translateY]);

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
      <View 
        key={r} 
        style={styles.row}
        onLayout={(e) => {
          if (r === 0 && rowHeight === 0) {
            setRowHeight(e.nativeEvent.layout.height);
          }
        }}
      >
        {cols}
      </View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      <Animated.View style={[styles.grid, { transform: [{ translateY }] }]}>
        {rows}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    overflow: 'hidden',
    paddingBottom: 20, // To lift the bottom row slightly as requested
  },
  grid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 4, 
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  }
});

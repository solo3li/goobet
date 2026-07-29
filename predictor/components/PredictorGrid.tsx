import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';

interface Props {
  gridData: string[][];
  activeRow: number;
}

export function PredictorGrid({ gridData, activeRow }: Props) {
  if (!gridData || gridData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Waiting for game to start...</Text>
      </View>
    );
  }

  const rows = [];
  for (let r = 9; r >= 0; r--) {
    const cols = [];
    for (let c = 0; c < 5; c++) {
      const isCore = gridData[r] ? gridData[r][c] === 'core' : false;
      const isActive = r === activeRow;

      cols.push(
        <View
          key={`${r}-${c}`}
          style={[
            styles.cell,
            isActive && styles.activeCell,
            isCore ? styles.coreCell : styles.appleCell,
          ]}
        >
          <Text style={styles.cellText}>{isCore ? '❌' : '🍏'}</Text>
        </View>
      );
    }
    rows.push(
      <View key={r} style={[styles.row, r === activeRow && styles.activeRowContainer]}>
        {cols}
      </View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      {rows}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  gridContainer: {
    width: '100%',
    maxWidth: 500,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  activeRowContainer: {
    borderWidth: 2,
    borderColor: '#ffeb3b',
    borderRadius: 8,
    padding: 4,
  },
  cell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  activeCell: {
    opacity: 1,
  },
  coreCell: {
    backgroundColor: '#ff444433',
  },
  appleCell: {
    backgroundColor: '#44ff4433',
  },
  cellText: {
    fontSize: Platform.OS === 'web' ? 24 : 32,
  }
});

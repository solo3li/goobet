import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  gridData: string[][];
  activeRow: number;
}

export function PredictorGrid({ gridData, activeRow }: Props) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1000, useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: false })
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: false }),
        Animated.timing(fadeAnim, { toValue: 0.4, duration: 1500, useNativeDriver: false })
      ])
    ).start();
  }, []);

  if (!gridData || gridData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Animated.View style={[styles.scanCircle, { transform: [{ scale: pulseAnim }], opacity: fadeAnim }]} />
        <Text style={styles.emptyText}>Waiting for Next Round...</Text>
        <Text style={styles.emptySubText}>AI is calculating probabilities</Text>
      </View>
    );
  }

  const rows = [];
  // The rows come 0 to 9, where 0 is bottom and 9 is top.
  // We want to render 9 (top) to 0 (bottom).
  for (let r = 9; r >= 0; r--) {
    const cols = [];
    const isActive = r === activeRow;
    const isPast = r < activeRow;
    
    for (let c = 0; c < 5; c++) {
      const isCore = gridData[r] ? gridData[r][c] === 'core' : false;
      
      let gradientColors: [string, string, ...string[]] = ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'];
      let text = '';

      if (isActive) {
        if (isCore) {
          gradientColors = ['rgba(239, 68, 68, 0.4)', 'rgba(153, 27, 27, 0.4)']; // Reddish hint
          text = '⚠️';
        } else {
          gradientColors = ['rgba(34, 197, 94, 0.8)', 'rgba(21, 128, 61, 0.8)']; // Green glow
          text = '✅';
        }
      } else if (isPast) {
        gradientColors = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'];
        text = isCore ? '❌' : '🍏';
      }

      cols.push(
        <View key={`${r}-${c}`} style={styles.cellWrapper}>
          <LinearGradient
            colors={gradientColors as any}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={[
              styles.cell,
              isActive && !isCore && styles.activeCellSafe,
              isActive && isCore && styles.activeCellDanger,
              isPast && styles.pastCell
            ]}
          >
            <Text style={[styles.cellText, isPast && styles.pastCellText]}>{text}</Text>
          </LinearGradient>
        </View>
      );
    }
    
    rows.push(
      <Animated.View 
        key={r} 
        style={[
          styles.row, 
          isActive && styles.activeRowContainer,
          isActive && { transform: [{ scale: pulseAnim }] }
        ]}
      >
        {isActive && (
          <View style={styles.activeIndicatorWrapper}>
            <Animated.View style={[styles.activeIndicator, { opacity: fadeAnim }]} />
          </View>
        )}
        {cols}
      </Animated.View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      <Text style={styles.multiplierHeader}>AI Probability Matrix</Text>
      {rows}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 100 
  },
  scanCircle: { 
    width: 120, 
    height: 120, 
    borderRadius: 60, 
    borderWidth: 2, 
    borderColor: '#0ea5e9', 
    backgroundColor: 'rgba(14, 165, 233, 0.1)', 
    marginBottom: 30,
    shadowColor: '#0ea5e9',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 }
  },
  emptyText: { 
    color: '#e0f2fe', 
    fontSize: 22, 
    fontWeight: '800', 
    letterSpacing: 1,
    marginBottom: 8
  },
  emptySubText: {
    color: '#38bdf8',
    fontSize: 14,
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: 2
  },
  gridContainer: { 
    width: '100%', 
    maxWidth: 450, 
    gap: 12, 
    paddingBottom: 40 
  },
  multiplierHeader: { 
    color: '#0ea5e9', 
    fontSize: 14, 
    fontWeight: '800', 
    textTransform: 'uppercase', 
    letterSpacing: 3, 
    textAlign: 'center', 
    marginBottom: 16,
    textShadowColor: 'rgba(14, 165, 233, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 10, 
    padding: 8, 
    borderRadius: 20, 
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  activeRowContainer: { 
    backgroundColor: 'rgba(14, 165, 233, 0.15)', 
    borderColor: 'rgba(14, 165, 233, 0.5)', 
    borderWidth: 1.5, 
    shadowColor: '#0ea5e9', 
    shadowOpacity: 0.3, 
    shadowRadius: 15, 
    shadowOffset: { width: 0, height: 0 },
    zIndex: 10
  },
  activeIndicatorWrapper: { 
    position: 'absolute', 
    left: -18, 
    top: '50%',
    marginTop: -4
  },
  activeIndicator: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#0ea5e9', 
    shadowColor: '#0ea5e9', 
    shadowOpacity: 1, 
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 }
  },
  cellWrapper: { 
    flex: 1, 
    aspectRatio: 1 
  },
  cell: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 14, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.05)' 
  },
  activeCellSafe: { 
    borderColor: '#4ade80', 
    borderWidth: 2,
    shadowColor: '#22c55e', 
    shadowOpacity: 0.6, 
    shadowRadius: 12, 
    shadowOffset: { width: 0, height: 0 } 
  },
  activeCellDanger: { 
    borderColor: '#f87171', 
    borderWidth: 1,
  },
  pastCell: { 
    opacity: 0.4,
    borderColor: 'transparent'
  },
  cellText: { 
    fontSize: Platform.OS === 'web' ? 24 : 30 
  },
  pastCellText: { 
    fontSize: Platform.OS === 'web' ? 20 : 24,
    opacity: 0.8
  }
});

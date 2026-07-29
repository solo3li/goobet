import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  gridData: string[][];
  activeRow: number;
}

export function PredictorGrid({ gridData, activeRow }: Props) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.2)).current;
  const entryAnim = useRef(new Animated.Value(0)).current;

  // Staggered entry animation for the grid
  useEffect(() => {
    Animated.timing(entryAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Pulse animation for active elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1200, useNativeDriver: false }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: false })
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.6, duration: 1500, useNativeDriver: false }),
        Animated.timing(fadeAnim, { toValue: 0.2, duration: 1500, useNativeDriver: false })
      ])
    ).start();
  }, []);

  if (!gridData || gridData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Animated.View style={[styles.scanRadar, { transform: [{ scale: pulseAnim }], opacity: fadeAnim }]} />
        <Text style={styles.emptyText}>AWAITING SESSION DATA</Text>
        <Text style={styles.emptySubText}>Establishing secure connection to game engine...</Text>
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
      
      let gradientColors: [string, string, ...string[]] = ['rgba(255,255,255,0.03)', 'rgba(255,255,255,0.01)'];
      let symbol = '';
      let textStyle = styles.textUnknown;

      if (isActive || isPast || gridData[r].length > 0) {
        if (isCore) {
          gradientColors = ['rgba(225, 29, 72, 0.2)', 'rgba(159, 18, 57, 0.3)']; // Crimson Hazard
          symbol = 'RISK';
          textStyle = styles.textDanger;
        } else {
          gradientColors = ['rgba(16, 185, 129, 0.25)', 'rgba(6, 95, 70, 0.35)']; // Emerald Safe
          symbol = 'SAFE';
          textStyle = styles.textSafe;
        }
      }

      if (!isPast && !isActive && (!gridData[r] || gridData[r].length === 0 || !gridData[r][c])) {
        // purely unknown
         symbol = '---';
         gradientColors = ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.0)'];
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
            <Text style={[styles.cellText, textStyle, isPast && styles.pastCellText]}>{symbol}</Text>
          </LinearGradient>
        </View>
      );
    }
    
    // Add staggered fade in based on row index
    const translateY = entryAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [50 + (9 - r) * 10, 0]
    });
    const opacity = entryAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    rows.push(
      <Animated.View 
        key={r} 
        style={[
          styles.row, 
          isActive && styles.activeRowContainer,
          isActive && { transform: [{ scale: pulseAnim }] },
          !isActive && { transform: [{ translateY }], opacity }
        ]}
      >
        {isActive && (
          <View style={styles.activeIndicatorWrapper}>
            <Animated.View style={[styles.activeIndicator, { opacity: fadeAnim }]} />
          </View>
        )}
        <View style={styles.rowLabelContainer}>
           <Text style={[styles.rowLabel, isActive && styles.rowLabelActive]}>0{r+1}</Text>
        </View>
        <View style={styles.cellsContainer}>
          {cols}
        </View>
      </Animated.View>
    );
  }

  return (
    <View style={styles.gridContainer}>
      <Text style={styles.matrixHeader}>/// PREDICTION MATRIX</Text>
      {rows}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 120 
  },
  scanRadar: { 
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    borderWidth: 1, 
    borderColor: '#38bdf8', 
    backgroundColor: 'rgba(56, 189, 248, 0.05)', 
    marginBottom: 40,
    shadowColor: '#38bdf8',
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 }
  },
  emptyText: { 
    color: '#e2e8f0', 
    fontSize: 20, 
    fontWeight: '900', 
    letterSpacing: 3,
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  emptySubText: {
    color: '#64748b',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  gridContainer: { 
    width: '100%', 
    maxWidth: 500, 
    gap: 12, 
    paddingTop: 10,
  },
  matrixHeader: { 
    color: '#475569', 
    fontSize: 12, 
    fontWeight: 'bold', 
    letterSpacing: 4, 
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 12, 
    padding: 8, 
    borderRadius: 8, 
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)'
  },
  activeRowContainer: { 
    backgroundColor: 'rgba(56, 189, 248, 0.08)', 
    borderColor: 'rgba(56, 189, 248, 0.4)', 
    shadowColor: '#38bdf8', 
    shadowOpacity: 0.2, 
    shadowRadius: 15, 
    shadowOffset: { width: 0, height: 0 },
    zIndex: 10
  },
  rowLabelContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowLabel: {
    color: '#475569',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  rowLabelActive: {
    color: '#38bdf8',
    textShadowColor: 'rgba(56, 189, 248, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  activeIndicatorWrapper: { 
    position: 'absolute', 
    left: -12, 
    top: '50%',
    marginTop: -4
  },
  activeIndicator: { 
    width: 4, 
    height: 12, 
    borderRadius: 2, 
    backgroundColor: '#38bdf8', 
    shadowColor: '#38bdf8', 
    shadowOpacity: 1, 
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  cellsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  cellWrapper: { 
    flex: 1, 
    aspectRatio: 1.2 
  },
  cell: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 6, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.05)' 
  },
  activeCellSafe: { 
    borderColor: '#10b981', 
    borderWidth: 1.5,
    shadowColor: '#10b981', 
    shadowOpacity: 0.4, 
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 0 } 
  },
  activeCellDanger: { 
    borderColor: '#e11d48', 
    borderWidth: 1.5,
  },
  pastCell: { 
    opacity: 0.5,
    borderColor: 'transparent'
  },
  cellText: { 
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  textSafe: { color: '#34d399' },
  textDanger: { color: '#fda4af' },
  textUnknown: { color: '#475569' },
  pastCellText: { 
    fontSize: 9,
    opacity: 0.7
  }
});

import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, Platform } from 'react-native';
import { MULTIPLIERS } from '../hooks/useGameLogic';

interface Props {
  activeRow: number;
  gameState: 'IDLE' | 'PLAYING' | 'GAMEOVER';
}

export function Multipliers({ activeRow, gameState }: Props) {
  return (
    <View style={styles.multipliers}>
      {[...MULTIPLIERS].reverse().map((mult, reversedIdx) => {
        const actualIdx = 9 - reversedIdx;
        let rowStyle: StyleProp<ViewStyle> = styles.multRow;
        let textStyle = styles.multText;
        
        if (gameState === 'PLAYING') {
          if (actualIdx === activeRow) {
            rowStyle = [styles.multRow, styles.activeRow];
            textStyle = [styles.multText, styles.activeText];
          } else if (actualIdx < activeRow) {
            textStyle = [styles.multText, styles.passedText];
          }
        }

        return (
          <View key={actualIdx} style={rowStyle}>
            <Text style={textStyle}>x{mult.toFixed(2)}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  multipliers: {
    width: 52,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingRight: 4,
  },
  multRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  activeRow: {
    // optional glow bg
  },
  multText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#5a8a6a',
    fontFamily: Platform.OS === 'web' ? 'Roboto, sans-serif' : undefined,
  },
  activeText: {
    color: '#00ff55',
    textShadowColor: '#00ff55',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  passedText: {
    color: '#3dba5f',
  }
});

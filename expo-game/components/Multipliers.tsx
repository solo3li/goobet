import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';
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
        let textStyle: StyleProp<TextStyle> = styles.multText;
        
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
    width: 65,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingVertical: 10,
  },
  multRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d3e23', // dark green pill
    borderRadius: 15,
    marginVertical: 3,
    paddingHorizontal: 2,
    maxWidth: 55,
  },
  activeRow: {
    backgroundColor: '#78c734', // bright green pill
    boxShadow: '0px 0px 8px #78c734',
    elevation: 4,
  },
  multText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6e9877',
    fontFamily: Platform.OS === 'web' ? 'Roboto, sans-serif' : undefined,
  },
  activeText: {
    color: '#0a2311',
    fontWeight: '900',
  },
  passedText: {
    color: '#a0cfa8',
  }
});

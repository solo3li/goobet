import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  gameState: 'IDLE' | 'PLAYING' | 'GAMEOVER';
  currentBet: string;
  onModifyBet: (type: 'MIN' | 'MAX' | 'X/2' | 'X2') => void;
  onStartGame: () => void;
  onCashout: () => void;
}

export function BottomBar({ gameState, currentBet, onModifyBet, onStartGame, onCashout }: Props) {
  const isPlaying = gameState === 'PLAYING';

  return (
    <View style={styles.bottomBar}>
      {!isPlaying ? (
        <View>
          <View style={styles.betControls}>
            {(['MIN', 'X2', 'X/2', 'MAX'] as const).map(type => (
              <TouchableOpacity key={type} style={styles.betBtn} onPress={() => onModifyBet(type)}>
                <Text style={styles.betBtnText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.betInputRow}>
            <View style={styles.betInputWrapper}>
              <Text style={styles.currencyInput}>EGP</Text>
              <TextInput 
                style={styles.betInput} 
                value={currentBet} 
                editable={false} 
              />
            </View>
            
            <TouchableOpacity onPress={onStartGame} style={styles.playBtnContainer}>
              <LinearGradient colors={['#5a90e8', '#1b4da0']} style={styles.playBtn}>
                <Text style={styles.playBtnText}>PLAY</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cashoutControls}>
          <TouchableOpacity onPress={() => onCashout()} style={styles.playBtnContainer}>
            <LinearGradient colors={['#5a90e8', '#1b4da0']} style={styles.playBtn}>
              <Text style={styles.playBtnText}>CASHOUT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    zIndex: 10,
  },
  betControls: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  betBtn: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  betBtnText: {
    color: '#fff',
    fontSize: 12,
  },
  betInputRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  betInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    gap: 6,
  },
  currencyInput: {
    color: '#888',
    fontSize: 13,
  },
  betInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    ...(Platform.OS === 'web' && { outlineStyle: 'none' }),
  },
  playBtnContainer: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 5,
  },
  playBtn: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  cashoutControls: {
    flexDirection: 'column',
    gap: 10,
  }
});

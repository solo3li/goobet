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
            <TouchableOpacity style={styles.betBtn} onPress={() => onModifyBet('MAX')}>
              <Text style={styles.betBtnText}>أقصى</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.betBtn} onPress={() => onModifyBet('X/2')}>
              <Text style={styles.betBtnText}>X/2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.betBtn} onPress={() => onModifyBet('X2')}>
              <Text style={styles.betBtnText}>X2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.betBtn} onPress={() => onModifyBet('MIN')}>
              <Text style={styles.betBtnText}>أدنى</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.betInputRow}>
            <TouchableOpacity onPress={onStartGame} style={styles.playBtnContainer}>
              <LinearGradient colors={['#2db3ff', '#0b8deb']} style={styles.playBtn}>
                <Text style={styles.playBtnText}>الرهان</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.betInputContainer}>
              <View style={styles.betInputWrapper}>
                <Text style={styles.currencyInput}>ج.م</Text>
                <TextInput 
                  style={styles.betInput} 
                  value={currentBet} 
                  editable={false} 
                />
              </View>
              <Text style={styles.minMaxText}>ج.م max 6782.37 - ج.م min 10</Text>
            </View>
          </View>

          <View style={styles.footerLinks}>
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkIcon}>⚡</Text>
              <Text style={styles.linkText}>بنقرة واحدة</Text>
            </TouchableOpacity>
            
            <View style={styles.linkSeparator} />
            
            <TouchableOpacity style={styles.linkItem}>
              <Text style={styles.linkIcon}>⚙</Text>
              <Text style={styles.linkText}>إعدادات</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.cashoutControls}>
          <TouchableOpacity onPress={() => onCashout()} style={styles.playBtnContainer}>
            <LinearGradient colors={['#ffaa00', '#cc8800']} style={styles.playBtn}>
              <Text style={styles.playBtnText}>خذ الأرباح</Text>
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
    backgroundColor: '#111820', // Darker solid background based on screenshot
    zIndex: 10,
  },
  betControls: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  betBtn: {
    flex: 1,
    backgroundColor: '#1d3e51',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  betBtnText: {
    color: '#84a5b5',
    fontSize: 14,
  },
  betInputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  betInputContainer: {
    flex: 2,
    backgroundColor: '#2a333d',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  betInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 4,
    marginBottom: 4,
  },
  currencyInput: {
    color: '#fff',
    fontSize: 18,
  },
  betInput: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    textAlign: 'right',
    ...(Platform.OS === 'web' && { outlineStyle: 'none' }),
  },
  minMaxText: {
    color: '#888',
    fontSize: 10,
    textAlign: 'right',
  },
  playBtnContainer: {
    flex: 1.2,
    height: 55,
  },
  playBtn: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  linkIcon: {
    color: '#fff',
    fontSize: 14,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
  },
  linkSeparator: {
    width: 1,
    backgroundColor: '#444',
    height: 16,
  },
  cashoutControls: {
    flexDirection: 'column',
    gap: 10,
  }
});

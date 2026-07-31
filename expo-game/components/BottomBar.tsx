import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  gameState: 'IDLE' | 'PLAYING' | 'GAMEOVER';
  currentBet: string;
  onModifyBet: (type: 'MIN' | 'MAX' | 'X/2' | 'X2') => void;
  onStartGame: () => void;
  onCashout: () => void;
  isLoading?: boolean;
}

export function BottomBar({ gameState, currentBet, onModifyBet, onStartGame, onCashout, isLoading = false }: Props) {
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
          
          <View style={styles.mergedInputContainer}>
            <TouchableOpacity
              onPress={onStartGame}
              style={[styles.playBtnContainer, isLoading && styles.btnDisabled]}
              disabled={isLoading}
            >
              <LinearGradient colors={['#1ba1e2', '#1476a6']} style={styles.playBtn}>
                <Text style={styles.playBtnText}>{isLoading ? 'جاري...' : 'الرهان'}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.betInputArea}>
              <View style={styles.betInputWrapper}>
                <TextInput 
                  style={styles.betInput} 
                  value={currentBet} 
                  editable={false} 
                />
                <Text style={styles.currencyInput}>ج.م</Text>
              </View>
              <View style={styles.minMaxRow}>
                <Text style={styles.minMaxText}>ج.م min 10 - max 6664.97 ج.م</Text>
              </View>
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
          <TouchableOpacity
            onPress={() => onCashout()}
            style={[styles.playBtnContainer, isLoading && styles.btnDisabled]}
            disabled={isLoading}
          >
            <LinearGradient colors={['#ffaa00', '#cc8800']} style={styles.playBtn}>
              <Text style={styles.playBtnText}>{isLoading ? 'جاري...' : 'خذ الأرباح'}</Text>
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
    paddingBottom: 24,
    backgroundColor: 'rgba(21, 32, 43, 0.95)', // Semi-transparent dark background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
  },
  betControls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  betBtn: {
    flex: 1,
    backgroundColor: '#1b3b4a', // Dark teal
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#265166',
  },
  betBtnText: {
    color: '#a0c4d6',
    fontSize: 14,
    fontWeight: '600',
  },
  mergedInputContainer: {
    flexDirection: 'row',
    backgroundColor: '#2b3643', // Dark grey/blue input background
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    height: 65,
  },
  betInputArea: {
    flex: 2,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  betInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingBottom: 4,
    marginBottom: 2,
  },
  currencyInput: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 8,
  },
  betInput: {
    flex: 1,
    color: '#fff',
    fontSize: 24,
    textAlign: 'right',
    fontWeight: 'bold',
    ...(Platform.OS === 'web' && { outlineStyle: 'none' as any }),
  },
  minMaxRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  minMaxText: {
    color: '#888',
    fontSize: 11,
  },
  playBtnContainer: {
    flex: 1.1,
  },
  playBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
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
  },
  btnDisabled: {
    opacity: 0.6,
  },
});

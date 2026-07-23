import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

interface Props {
  visible: boolean;
  amount: string;
}

export function WinModal({ visible, amount }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.winPopup}>
          <Text style={styles.winTitle}>You Won!</Text>
          <Text style={styles.winAmount}>${amount}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // dark backdrop
  },
  winPopup: {
    backgroundColor: 'rgba(5, 30, 15, 0.96)',
    borderWidth: 2,
    borderColor: '#00ff55',
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 44,
    alignItems: 'center',
    shadowColor: '#00ff55',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 32,
    elevation: 10,
  },
  winTitle: {
    color: '#00ff55',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  winAmount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

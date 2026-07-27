import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  balance: number;
  onBack?: () => void;
}

export function Header({ balance, onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconBtn}>
        <Text style={styles.iconText}>i</Text>
      </TouchableOpacity>

      <View style={styles.balanceContainer}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.balanceText}>{balance.toFixed(0)} <Text style={styles.currency}>ج.م</Text></Text>
      </View>

      <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
        <Text style={styles.iconText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  iconBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  iconText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  balanceText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  currency: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: 'normal',
  },
  addBtn: {
    backgroundColor: '#00a3ff', // matches screenshot blue color for +
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  }
});

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppleGame from './screens/AppleGame';
import LoginScreen from './components/LoginScreen';
import ProfileDashboard from './components/ProfileDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState('');
  const [balance, setBalance] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'game'>('dashboard');

  const handleLogin = (id: string, initialBalance: number) => {
    setAccountId(id);
    setBalance(initialBalance);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <View style={styles.container}>
      {currentScreen === 'dashboard' ? (
        <ProfileDashboard 
          accountId={accountId} 
          balance={balance} 
          onOpenGame={() => setCurrentScreen('game')} 
        />
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.gameHeader}>
            <TouchableOpacity onPress={() => setCurrentScreen('dashboard')} style={styles.backBtn}>
              <MaterialCommunityIcons name="arrow-right" size={24} color="#fff" />
              <Text style={styles.backText}>رجوع</Text>
            </TouchableOpacity>
            <View style={styles.headerBalance}>
              <Text style={styles.balanceTextHeader}>ج.م {balance.toFixed(2)}</Text>
            </View>
          </View>
          <AppleGame accountId={accountId} onBalanceChange={setBalance} balance={balance} />
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  gameHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155'
  },
  backBtn: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    marginRight: 5,
    fontSize: 16,
  },
  headerBalance: {
    backgroundColor: '#334155',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  balanceTextHeader: {
    color: '#34d399',
    fontWeight: 'bold',
  }
});

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen } from './screens/HomeScreen';
import AppleGame from './screens/AppleGame';
import LoginScreen from './components/LoginScreen';
import ProfileDashboard from './components/ProfileDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [accountId, setAccountId]       = useState('');
  const [balance, setBalance]           = useState(0);
  const [authToken, setAuthToken]       = useState('');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'menu' | 'game'>('home');

  const handleLogin = (id: string, initialBalance: number, token: string) => {
    setAccountId(id);
    setBalance(initialBalance);
    setAuthToken(token);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <View style={styles.container}>
      {currentScreen === 'home' ? (
        <HomeScreen
          onPlayApple={() => setCurrentScreen('game')}
          onNavigateToMenu={() => setCurrentScreen('menu')}
        />
      ) : currentScreen === 'menu' ? (
        <ProfileDashboard
          accountId={accountId}
          balance={balance}
          onOpenGame={() => setCurrentScreen('game')}
          onNavigateToHome={() => setCurrentScreen('home')}
        />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <AppleGame
            accountId={accountId}
            onBalanceChange={setBalance}
            balance={balance}
            authToken={authToken}
            onBack={() => setCurrentScreen('menu')}
          />
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

});

import React, { useState } from 'react';
import { AppleGame } from './screens/AppleGame';
import { HomeScreen } from './screens/HomeScreen';

type Screen = 'HOME' | 'APPLE_GAME';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');

  if (currentScreen === 'APPLE_GAME') {
    return <AppleGame onBack={() => setCurrentScreen('HOME')} />;
  }

  return <HomeScreen onPlayApple={() => setCurrentScreen('APPLE_GAME')} />;
}

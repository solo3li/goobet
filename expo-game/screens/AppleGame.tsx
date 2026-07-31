import React from 'react';
import { StyleSheet, View, ImageBackground, SafeAreaView, StatusBar, Text, useWindowDimensions, Platform } from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import { Header } from '../components/Header';
import { Multipliers } from '../components/Multipliers';
import { GameGrid } from '../components/GameGrid';
import { BottomBar } from '../components/BottomBar';
import { WinModal } from '../components/WinModal';

interface Props {
  accountId: string;
  balance: number;
  onBalanceChange: (b: number) => void;
  authToken: string;
  onBack?: () => void;
}

export default function AppleGame({ accountId, balance, onBalanceChange, authToken, onBack }: Props) {
  const {
    currentBet,
    gameState,
    activeRow,
    gridData,
    revealedCells,
    showWinPopup,
    finalWin,
    isLoading,
    error,
    startGame,
    cashout,
    handleCellClick,
    modifyBet,
  } = useGameLogic(accountId, balance, onBalanceChange, authToken);

  const { height } = useWindowDimensions();
  const idealWidth = Math.min(450, height * (394 / 854));

  return (
    <View style={styles.root}>
      <View style={[styles.gameContainer, { width: Platform.OS === 'web' ? idealWidth : '100%' }]}>
        <ImageBackground source={require('../assets/background.png')} style={styles.background} resizeMode="cover">
          <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" />
            <Header balance={balance} onBack={onBack || (() => {})} />
            <Text style={styles.title}>APPLE OF FORTUNE</Text>

            {/* Error Banner */}
            {error ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.gameArea}>
              <Multipliers activeRow={activeRow} gameState={gameState} />
              <GameGrid
                gameState={gameState}
                activeRow={activeRow}
                gridData={gridData}
                revealedCells={revealedCells}
                onCellClick={handleCellClick}
              />
            </View>

            <BottomBar
              gameState={gameState}
              currentBet={currentBet}
              onModifyBet={modifyBet}
              onStartGame={startGame}
              onCashout={cashout}
              isLoading={isLoading}
            />

            <WinModal visible={showWinPopup} amount={finalWin} />
          </SafeAreaView>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameContainer: {
    height: '100%',
    overflow: 'hidden',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === 'android' ? 24 : 0,
  },
  title: {
    textAlign: 'center',
    fontSize: 11,
    letterSpacing: 1.5,
    color: '#ccc',
    marginBottom: 6,
    zIndex: 10,
    fontFamily: Platform.OS === 'web' ? 'Roboto, sans-serif' : undefined,
  },
  gameArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: 8,
    zIndex: 10,
    overflow: 'hidden',
  },
  errorBanner: {
    backgroundColor: 'rgba(220,38,38,0.85)',
    marginHorizontal: 12,
    marginBottom: 4,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    zIndex: 20,
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
});

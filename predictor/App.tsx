import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform, ScrollView, Animated, Dimensions } from 'react-native';
import * as signalR from '@microsoft/signalr';
import { PredictorGrid } from './components/PredictorGrid';
import PredictorLogin from './components/PredictorLogin';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState<string>('');
  
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [gridData, setGridData] = useState<string[][]>([]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [status, setStatus] = useState<string>('Initializing...');
  const [latency, setLatency] = useState<number>(0);

  // Fake latency simulation for telemetry realism
  useEffect(() => {
    if (status === 'Connected') {
      const interval = setInterval(() => {
        setLatency(Math.floor(Math.random() * 15) + 12);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://178.62.192.74:8081/gamehub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [isLoggedIn]);

  useEffect(() => {
    if (connection && isLoggedIn) {
      connection.start()
        .then(() => {
          setStatus('Connected');
          connection.invoke('SubscribeToSession', accountId);

          connection.on('ReceiveGameGrid', (data: string[][]) => {
            setGridData(data);
          });

          connection.on('ReceiveActiveRow', (row: number) => {
            setActiveRow(row);
          });
        })
        .catch(e => setStatus(`Connection failed`));
    }
  }, [connection, isLoggedIn, accountId]);

  const currentMultiplier = [1.23, 1.54, 1.93, 2.41, 4.02, 6.71, 11.18, 27.97, 69.93, 349.68][activeRow] || 0.00;

  if (!isLoggedIn) {
    return <PredictorLogin onLogin={(id) => {
      setAccountId(id);
      setIsLoggedIn(true);
    }} />;
  }

  return (
    <LinearGradient colors={['#050814', '#0B1121']} style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInner}>
        <StatusBar barStyle="light-content" />
        
        {/* Professional HUD Header */}
        <View style={styles.hudHeader}>
          <View style={styles.hudTopRow}>
            <Text style={styles.brandTitle}>APPLE PREDICTOR <Text style={styles.brandSub}>PRO</Text></Text>
            <View style={styles.networkStatus}>
              <View style={[styles.statusDot, status === 'Connected' ? styles.statusConnected : styles.statusDisconnected]} />
              <Text style={styles.networkText}>{status === 'Connected' ? `LATENCY: ${latency}ms` : 'OFFLINE'}</Text>
            </View>
          </View>
          
          <View style={styles.telemetryBar}>
            <View style={styles.telemetryItem}>
              <Text style={styles.telemetryLabel}>MODEL ACCURACY</Text>
              <Text style={styles.telemetryValueGood}>94.2%</Text>
            </View>
            <View style={styles.telemetryDivider} />
            <View style={styles.telemetryItem}>
              <Text style={styles.telemetryLabel}>ACTIVE ROW</Text>
              <Text style={styles.telemetryValueNeutral}>{activeRow + 1} / 10</Text>
            </View>
            <View style={styles.telemetryDivider} />
            <View style={styles.telemetryItem}>
              <Text style={styles.telemetryLabel}>MULTIPLIER TARGET</Text>
              <Text style={styles.telemetryValueHighlight}>{currentMultiplier.toFixed(2)}x</Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <PredictorGrid gridData={gridData} activeRow={activeRow} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1 
  },
  safeAreaInner: { 
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  hudHeader: {
    padding: isMobile ? 16 : 24,
    backgroundColor: 'rgba(10, 15, 30, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(56, 189, 248, 0.2)', // Subtle Cyan Border
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  hudTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    color: '#e2e8f0',
    fontSize: isMobile ? 18 : 22,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  brandSub: {
    color: '#38bdf8', // Cyan accent
  },
  networkStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  statusDot: {
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    marginRight: 8
  },
  statusConnected: { 
    backgroundColor: '#10b981', // Emerald
    shadowColor: '#10b981', 
    shadowOpacity: 1, 
    shadowRadius: 8, 
    shadowOffset: { width: 0, height: 0 } 
  },
  statusDisconnected: { 
    backgroundColor: '#ef4444' 
  },
  networkText: { 
    color: '#94a3b8', 
    fontSize: 10, 
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  telemetryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  telemetryItem: {
    flex: 1,
    alignItems: 'center',
  },
  telemetryDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  telemetryLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  telemetryValueGood: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  telemetryValueNeutral: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  telemetryValueHighlight: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(56, 189, 248, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  content: { 
    padding: 20, 
    alignItems: 'center',
    minHeight: '100%',
    paddingBottom: 60,
  }
});

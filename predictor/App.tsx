import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform, ScrollView, Animated } from 'react-native';
import * as signalR from '@microsoft/signalr';
import { PredictorGrid } from './components/PredictorGrid';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [gridData, setGridData] = useState<string[][]>([]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [status, setStatus] = useState<string>('Disconnected');
  const [sessionId, setSessionId] = useState<string>('test-session'); 

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://178.62.192.74:8081/gamehub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          setStatus('Connected');
          connection.invoke('SubscribeToSession', sessionId);

          connection.on('ReceiveGameGrid', (data: string[][]) => {
            setGridData(data);
          });

          connection.on('ReceiveActiveRow', (row: number) => {
            setActiveRow(row);
          });
        })
        .catch(e => setStatus(`Connection failed`));
    }
  }, [connection, sessionId]);

  return (
    <LinearGradient colors={['#0f172a', '#1e1b4b']} style={styles.safeArea}>
      <SafeAreaView style={styles.safeAreaInner}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.title}>AI PREDICTOR</Text>
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, status === 'Connected' ? styles.statusConnected : styles.statusDisconnected]} />
            <Text style={styles.statusText}>{status}</Text>
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
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    color: '#e2e8f0',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(255,255,255,0.2)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)'
  },
  statusDot: {
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    marginRight: 8
  },
  statusConnected: { 
    backgroundColor: '#4ade80', 
    shadowColor: '#4ade80', 
    shadowOpacity: 0.8, 
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 0 } 
  },
  statusDisconnected: { 
    backgroundColor: '#f87171' 
  },
  statusText: { 
    color: '#cbd5e1', 
    fontSize: 12, 
    fontWeight: '700',
    letterSpacing: 0.5
  },
  content: { 
    padding: 20, 
    alignItems: 'center',
    minHeight: '100%',
    justifyContent: 'center'
  }
});

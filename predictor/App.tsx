import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import * as signalR from '@microsoft/signalr';
import { PredictorGrid } from './components/PredictorGrid';

export default function App() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [gridData, setGridData] = useState<string[][]>([]);
  const [activeRow, setActiveRow] = useState<number>(0);
  const [status, setStatus] = useState<string>('Disconnected');
  const [sessionId, setSessionId] = useState<string>('test-session'); // In a real app, you'd input this

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:8081/gamehub")
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
        .catch(e => setStatus(`Connection failed: ${e}`));
    }
  }, [connection, sessionId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Predictor Dashboard (Expo 54)</Text>
        <Text style={styles.status}>Status: {status}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <PredictorGrid gridData={gridData} activeRow={activeRow} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    color: '#aaa',
    marginTop: 4,
  },
  content: {
    padding: 16,
    alignItems: 'center',
  }
});

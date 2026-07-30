import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  onLogin: (accountId: string) => void;
}

export default function PredictorLogin({ onLogin }: Props) {
  const [accountId, setAccountId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (accountId.length !== 10) {
      setError('Invalid ID. Must be exactly 10 digits.');
      return;
    }
    // Simulate login for predictor (since it's a "hack" app, it just binds to the ID)
    onLogin(accountId);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.overlay}>
        <MaterialCommunityIcons name="skull-crossbones" size={60} color="#00ff00" style={styles.icon} />
        <Text style={styles.title}>SYSTEM INFILTRATION</Text>
        <Text style={styles.subtitle}>Enter Target ID (10 digits) to intercept data feed</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>ID ></Text>
          <TextInput
            style={styles.input}
            value={accountId}
            onChangeText={text => {
              setAccountId(text.replace(/[^0-9]/g, ''));
              setError('');
            }}
            keyboardType="numeric"
            maxLength={10}
            placeholder="0000000000"
            placeholderTextColor="#004400"
            autoFocus
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>[ INITIATE HACK ]</Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>v2.0.4 | Connection SECURE</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 20, 0, 0.8)', // Dark green tint
  },
  icon: {
    marginBottom: 20,
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    color: '#00ff00',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 2,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#00aa00',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ff00',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 255, 0, 0.05)',
  },
  prefix: {
    color: '#00ff00',
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#00ff00',
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 3,
  },
  errorText: {
    color: '#ff0000',
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#003300',
    borderWidth: 1,
    borderColor: '#00ff00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: '#00ff00',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  footerText: {
    color: '#004400',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  }
});

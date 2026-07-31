import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Dimensions, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API_BASE_URL } from '../config';

const { width, height } = Dimensions.get('window');

interface LoginScreenProps {
  onLogin: (accountId: string, balance: number, token: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!accountId || !password) {
      setError('يرجى إدخال المعرف وكلمة المرور');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data || 'خطأ في تسجيل الدخول');
      } else {
        onLogin(data.accountId, data.balance, data.token);
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Pattern Mock */}
      <View style={styles.backgroundPattern}>
        <MaterialCommunityIcons name="soccer" size={40} color="rgba(26, 176, 229, 0.05)" style={{position: 'absolute', top: 50, left: 30}} />
        <MaterialCommunityIcons name="basketball" size={60} color="rgba(26, 176, 229, 0.05)" style={{position: 'absolute', top: 120, right: 40}} />
        <MaterialCommunityIcons name="tennis" size={50} color="rgba(26, 176, 229, 0.05)" style={{position: 'absolute', top: 200, left: 80}} />
        <MaterialCommunityIcons name="whistle" size={45} color="rgba(26, 176, 229, 0.05)" style={{position: 'absolute', top: 250, right: 90}} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardView}
      >
        <View style={styles.card}>
          <Text style={styles.title}>تسجيل الدخول</Text>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="cellphone" size={24} color="#fff" />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>البريد الإلكتروني أو المعرف</Text>
              <TextInput
                style={styles.input}
                value={accountId}
                onChangeText={setAccountId}
                keyboardType="numeric"
                maxLength={10}
                placeholder="1749919045"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapperFull}>
              <Text style={styles.inputLabel}>كلمة المرور</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="........"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginButtonText}>{loading ? 'جاري التحميل...' : 'تسجيل الدخول'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>هل نسيت كلمة المرور؟</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>ليس لديك حساب؟ </Text>
        <TouchableOpacity>
          <Text style={styles.registerLink}>سجّل</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddecfa',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
    minHeight: height * 0.6,
    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
    marginBottom: 40,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  inputContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: '#1ab0e5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  inputWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  inputWrapperFull: {
    flex: 1,
    alignItems: 'flex-end',
    width: '100%',
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
    width: '100%',
    padding: 0,
    margin: 0,
    height: 24,
  },
  loginButton: {
    backgroundColor: '#1ab0e5',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#1ab0e5',
    fontSize: 15,
  },
  registerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  registerText: {
    color: '#666',
    fontSize: 15,
  },
  registerLink: {
    color: '#1ab0e5',
    fontSize: 15,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'right',
    marginBottom: 10,
  }
});

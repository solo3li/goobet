// Central configuration for expo-game
// To override, set EXPO_PUBLIC_API_URL in your .env file or environment
export const API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_URL) ||
  'http://178.62.192.74:8081';

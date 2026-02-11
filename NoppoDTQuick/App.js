import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Share, Animated } from 'react-native';

export default function App() {
  const [status, setStatus] = useState('READY');
  const scaleAnim = new Animated.Value(1);

  const handlePress = async () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    setStatus('CONNECTING...');
    try {
      const result = await Share.share({ message: 'NoppoDTQuick: 1対1の高速転送' });
      if (result.action === Share.sharedAction) {
        setStatus('TRANSFERRING...');
        setTimeout(() => setStatus('COMPLETED! ✅'), 2000);
      } else { setStatus('READY'); }
    } catch { setStatus('ERROR'); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>NoppoDT <Text style={{color:'#00e5ff'}}>Quick</Text></Text>
      </View>
      <View style={styles.main}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
            <Text style={styles.buttonText}>PUSH TO SEND</Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.statusBadge}><Text style={styles.statusText}>{status}</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { marginTop: 80, alignItems: 'center' },
  logo: { fontSize: 32, fontWeight: '900', color: '#fff' },
  main: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#00e5ff', justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold' },
  statusBadge: { marginTop: 40, padding: 10, borderRadius: 20, backgroundColor: '#1a1a1a' },
  statusText: { color: '#00e5ff', fontWeight: 'bold' },
});

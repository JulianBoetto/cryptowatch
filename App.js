import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements'
import { Feather as Icon } from '@expo/vector-icons'

import CoinDetailedScreen from './src/screens/CoinDetailsScreen';

export default function App() {

  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt');

  const searchButton = <Icon.Button
    name='search'
    size={24}
    color='white'
    backgroundColor='transparent'
    onPress={e => setSymbol(text.replace(/ /g,''))}
  />

  return (
    <View style={styles.container}>
      <Text h1 style={styles.titulo}>CryptoWatch 1.0</Text>
      <Input
        style={styles.titulo}
        autoCapitalize='characters'
        leftIcon={<Icon name='dollar-sign' size={24} color='white' />}
        rightIcon={searchButton}
        onChangeText={setText}
      />
      <CoinDetailedScreen 
        symbol={symbol}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    flex: 1,
    // marginTop: 40,
    // margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#292929'
  },
  titulo: {
    color: '#fff'
  }
});

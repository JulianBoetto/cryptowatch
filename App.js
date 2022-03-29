import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements'
import { Feather as Icon } from '@expo/vector-icons'

export default function App() {

  const [data, setData] = useState({});
  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt');

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => {
      if(lastJsonMessage){
        setData(lastJsonMessage)
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true, // TENTA RECONECTAR
    reconnectInterval: 3000
  })

  const searchButton = <Icon.Button
    name='search'
    size={24}
    color='black'
    backgroundColor='transparent'
    onPress={e => setSymbol(text.toLocaleLowerCase())}
  />

  return (
    <View style={styles.container}>
      <Text h1>CryptoWatch 1.0</Text>
      <Input
        autoCapitalize='characters'
        leftIcon={<Icon name='dollar-sign' size={24} color='black' />}
        rightIcon={searchButton}
        onChangeText={setText}
      />
      <Text>{JSON.stringify(data)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 40,
    margin: 20,
    alignContent: 'center'
  },
});

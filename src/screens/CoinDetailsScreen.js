import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useWebSocket from 'react-use-websocket';
import { Feather as Icon } from '@expo/vector-icons'
import { Input, Text } from 'react-native-elements'
import { btc } from '../valores-cripto/btc-usdt'

export default function CoinDetailsScreen({symbol}) {

  const [data, setData] = useState({});
  let historic = []

  const historic_btc = [{
    data: '03-02-2022',
    amount: 0.00145012,
    price: 39033.77
    // 206,879.02
    // 2022-02-03 13:01:01
    // 5.3
  },{
    data: '05-02-2022',
    amount: 0.00125524,
    price: 45093.98
    // 238998.119881457
    // 5.3
  },{
    data: '25-02-2022',
    amount: 0.00144612,
    price: 40281.86
    // 207,451.58
    // 2022-02-25 15:48:35
    // 5.15
  },{
    data: '17-03-2022',
    amount: 0.00024,
    price: 41280.02
  },{
    data: '17-03-2022',
    amount: 0.00047,
    price: 41793.06
  }]

  const historic_waves = [{
    data: '07-03-2022',
    amount: 0.94743762,
    price: 22.05
  },{
    data: '01-04-2022',
    amount: 0.2,
    price: 51
  }]

  const historic_test = [{
    data: '07-03-2022',
    amount: 1,
    price: 46000
  }
  ,{
    data: '01-04-2022',
    amount: 2,
    price: 47000
  }
]

  switch (symbol) {
    case 'btcusdt':
      historic = historic_btc
      break
    case 'wavesusdt':
      historic = historic_waves
      break
    default:
      historic = []
  }

  
  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => { 
      if(lastJsonMessage){
        let diferencia = 0
        historic.map(valor => {
          let total = valor.amount * valor.price          
          let totalActual = valor.amount * data.c
          let diferenciaValor = totalActual - total
          diferencia = diferencia + diferenciaValor
        })
        lastJsonMessage.diferencia = diferencia.toFixed(2)
        setData(lastJsonMessage)
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true, // TENTA RECONECTAR
    reconnectInterval: 3000
  })

  return (
    <View>
      <View style={styles.linha}>
        <Text style={styles.titulo}>{data.s}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Preço Atual:</Text>
        <Text style={styles.conteudo}> {data.c}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Variação:</Text>
        <Text style={data.P >= 0 ? styles.positivo : styles.negativo}> {data.P}%</Text>
      </View>
      {/* <View style={styles.linha}>
        <Text style={styles.rotulo}>Volume:</Text>
        <Text style={styles.conteudo}> {data.v}</Text>
      </View> */}
      {/* <View style={styles.linha}>
        <Text style={styles.rotulo}>Total invertido (usdt):</Text>
        <Text style={styles.conteudo}> {total}</Text>
      </View> */}
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Total actual (usdt):</Text>
        <Text style={data.diferencia >= 0 ? styles.positivo : styles.negativo}> {JSON.stringify(btc)}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.rotulo}>Ganancia (usdt):</Text>
        <Text style={data.diferencia >= 0 ? styles.positivo : styles.negativo}> u$s {data.diferencia}</Text>
      </View>
      
    </View>
  )
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
  rotulo: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff'
  },
  conteudo: {
    fontSize: 24,
    color: '#fff'
  },
  positivo: {
    fontSize: 24,
    color: '#00ff00'
  },
  negativo: {
    fontSize: 24,
    color: '#ff0000'
  },
  linha: {
    flexDirection: 'row',
    width: '100%'
  },
  titulo: {
    fontSize: 30,
    color: '#fff'
  }
});
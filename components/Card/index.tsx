import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

type CardProps = { header: React.ReactNode; body: React.ReactNode; style?: Object }

function Card(props: CardProps) {
  return (
    <View style={[styles.cardContainer, props.style]}>
      <View>{props.header}</View>
      <View>{props.body}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    display: 'flex',
    color: 'rgb(74, 74, 74)',
    backgroundColor: '#fff',
    borderColor: 'rgb(219, 219, 219)',
    borderLeftWidth: 4,
    borderRadius: 4,
    width: Dimensions.get('window').width,
  },
})

export default Card

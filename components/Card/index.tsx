import * as React from 'react'
import { StyleSheet } from 'react-native'
import { View } from '../Themed'

type CardProps = { header: React.ReactNode; body: React.ReactNode }

function Card(props: CardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>{props.header}</View>
      <View>{props.body}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    display: 'flex',
    borderWidth: 2,
    borderRadius: 2,
    width: 300,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default Card

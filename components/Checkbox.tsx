import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface CheckboxProps {
  onChange: Function
  disabled?: Boolean
  style?: Object
  value: Boolean
}

export default function Checkbox(props: CheckboxProps) {
  const [checked, onChange] = useState(props.value)

  function onCheckmarkPress() {
    onChange(!checked)
    props.onChange(!checked)
  }

  return (
    <Pressable
      style={[
        styles.checkboxBase,
        props.style,
        checked && styles.checkboxChecked,
        props.disabled && styles.disabled,
      ]}
      onPress={onCheckmarkPress}
      disabled={!!props.disabled}
    >
      {checked && <Ionicons name='checkmark' size={24} color='white' />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  disabled: {
    backgroundColor: 'lightgray',
  },
})

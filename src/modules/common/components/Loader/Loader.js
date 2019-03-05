import React from 'react'
import {
  ActivityIndicator,
  View,
} from 'react-native'

import styles from './styles'

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

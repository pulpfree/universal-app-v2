import React from 'react'
import {
  // Alert,
  // Dimensions,
  // Text,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'

import { styles } from './index'

export default function Menu() {
  return (
    <View style={styles.menuCont}>
      <Button
        title="Email PDF"
        buttonStyle={styles.button}
        titleStyle={styles.buttonCont}
      />
      <Button
        title="Save PDF"
        buttonStyle={styles.button}
        titleStyle={styles.buttonCont}
      />
    </View>
  )
}

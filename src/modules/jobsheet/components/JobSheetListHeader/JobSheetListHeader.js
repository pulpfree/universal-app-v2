import React from 'react'

import {
  Text,
  View,
} from 'react-native'

import styles from './styles'

export default function JobSheetListHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>Street</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>City</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>Last Update</Text>
      </View>
    </View>
  )
}

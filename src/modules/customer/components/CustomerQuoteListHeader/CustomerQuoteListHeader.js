import React from 'react'

import {
  Text,
  View,
} from 'react-native'

import styles from './styles'

export default function JobSheetListHeader() {
  return (
    <View style={styles.header}>
      <View style={[styles.cell, { flex: 0.5 }]}>
        <Text allowFontScaling={false} style={styles.cellText}>No/Rev</Text>
      </View>
      <View style={styles.cell}>
        <Text allowFontScaling={false} style={styles.cellText}>Date</Text>
      </View>
      <View style={[styles.cell, { flex: 1.5 }]}>
        <Text allowFontScaling={false} style={styles.cellText}>Jobsheet</Text>
      </View>
      <View style={[styles.cell, { flex: 0.5 }]}>
        <Text allowFontScaling={false} style={[styles.cellText, { textAlign: 'center' }]}>Invoiced</Text>
      </View>
      <View style={[styles.cell, { flex: 0.5 }]}>
        <Text allowFontScaling={false} style={[styles.cellText, { textAlign: 'center' }]}>Paid</Text>
      </View>
      <View style={styles.cell}>
        <Text allowFontScaling={false} style={[styles.cellText, styles.right]}>Cost</Text>
      </View>
      <View style={styles.cell}>
        <Text allowFontScaling={false} style={[styles.cellText, styles.right]}>Amount Due</Text>
      </View>
    </View>
  )
}

import React from 'react'
import {
  Text,
  View,
} from 'react-native'

import styles from './styles'

export default function QuoteListHeader() {
  return (
    <View style={styles.header}>
      <View style={[styles.cell, { flex: 0.3 }]}>
        <Text style={styles.cellText}>No</Text>
      </View>
      <View style={[styles.cell, { flex: 1.25 }]}>
        <Text style={styles.cellText}>Name</Text>
      </View>
      <View style={[styles.cell, { flex: 1.25 }]}>
        <Text style={styles.cellText}>Address</Text>
      </View>
      <View style={[styles.cell, { flex: 0.65 }]}>
        <Text style={[styles.cellText, { textAlign: 'right' }]}>Cost</Text>
      </View>
      <View style={[styles.cell, { flex: 0.75 }]}>
        <Text style={[styles.cellText, { textAlign: 'right' }]}>Outstanding</Text>
      </View>
    </View>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import styles from './styles'

export default function PaymentInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.cell}>
        <View style={styles.row}>
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.value}>James ONeil</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Invoice</Text>
          <Text style={styles.value}>1387</Text>
        </View>

        <View style={styles.row} />
      </View>

      <View style={styles.cell}>
        <View style={styles.row}>
          <Text style={styles.label}>Total Cost</Text>
          <Text style={[styles.value, styles.right]}>5,500.00</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total Payments</Text>
          <Text style={[styles.value, styles.right]}>500.00</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, styles.bold]}>Total Owing</Text>
          <Text style={[styles.value, styles.bold, styles.right]}>5,000.00</Text>
        </View>
      </View>
    </View>
  )
}

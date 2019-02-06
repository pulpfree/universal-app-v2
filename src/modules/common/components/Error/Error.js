import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import styles from './styles'

export default function Error({ error }) {
  console.log('error:', error)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error.message}</Text>
    </View>
  )
}
Error.propTypes = {
  error: PropTypes.instanceOf(Object).isRequired,
}

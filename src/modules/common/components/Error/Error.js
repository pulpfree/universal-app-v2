import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import styles from './styles'

export default function Error({ error }) {
  let errorMsg

  if (typeof error === 'object') {
    errorMsg = error.message
  } else {
    errorMsg = error
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{errorMsg}</Text>
    </View>
  )
}
Error.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]).isRequired,
}

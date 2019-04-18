import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Client } from 'bugsnag-react-native'

import styles from './styles'
import { BugsnagAPIKey } from '../../../../config/constants'

const bugsnag = new Client(BugsnagAPIKey)

export default function Error({ error }) {
  let errorMsg

  if (typeof error === 'object') {
    errorMsg = error.message
    bugsnag.notify(error)
  } else {
    errorMsg = error
    // bugsnag.notify(new Error(error))
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

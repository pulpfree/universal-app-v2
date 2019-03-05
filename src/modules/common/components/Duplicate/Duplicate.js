import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import styles from './styles'

let displayMsg = 'You are currently editing a duplicate item.'

export default function Loader({ msg }) {
  if (msg) displayMsg = msg

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{displayMsg}</Text>
    </View>
  )
}
Loader.propTypes = {
  msg: PropTypes.string,
}
Loader.defaultProps = {
  msg: '',
}

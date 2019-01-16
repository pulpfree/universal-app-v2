import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import styles from './styles'

const Heading = ({ label, padTop = true }) => (
  <View style={[styles.headingRow, padTop ? styles.rowPadding : null]}>
    <Text style={styles.headingText}>{label}</Text>
  </View>
)
Heading.propTypes = {
  label: PropTypes.string.isRequired,
  padTop: PropTypes.bool,
}
Heading.defaultProps = {
  padTop: true,
}
export default Heading

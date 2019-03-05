import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import styles from './styles'

const FormHeader = ({ label }) => (
  <View style={styles.view}>
    <Text style={styles.text}>{label}</Text>
  </View>
)
FormHeader.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormHeader

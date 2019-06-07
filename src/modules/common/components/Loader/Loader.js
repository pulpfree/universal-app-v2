import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View } from 'react-native'

import styles from './styles'

export default function Loader({ style }) {
  let compStyles = styles.container
  if (style) {
    compStyles = style
  }
  return (
    <View style={compStyles}>
      <ActivityIndicator size="large" />
    </View>
  )
}
Loader.propTypes = {
  style: PropTypes.instanceOf(Object),
}
Loader.defaultProps = {
  style: null,
}

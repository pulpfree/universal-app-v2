import React from 'react'
import PropTypes from 'prop-types'
import {
  SafeAreaView,
} from 'react-native'

import styles from './styles'

export default function Container({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  )
}
Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

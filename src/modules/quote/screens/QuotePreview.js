import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import { styles, Menu, PDF } from '../components/QuotePreview'

function QuotePreview({ navigation }) {
  const previewArgs = navigation.getParam('previewArgs')
  return (
    <View style={styles.container}>
      <Menu />
      <PDF previewArgs={previewArgs} />
    </View>
  )
}
QuotePreview.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuotePreview)

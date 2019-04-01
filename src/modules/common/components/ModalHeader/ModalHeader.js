import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import clr from '../../../../config/colors'
import styles from './styles'

function ModalHeader({ navigation, title }) {
  return (
    <View style={styles.header}>
      <Text style={{ width: 30 }} />
      <Text style={styles.headerText}>{title}</Text>
      <Icon
        name="close"
        onPress={() => navigation.goBack()}
        size={30}
        color={clr.white}
        containerStyle={styles.iconCont}
      />
    </View>
  )
}
ModalHeader.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
}

export default withNavigation(ModalHeader)

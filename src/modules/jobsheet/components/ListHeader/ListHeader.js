import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import { Icon } from 'react-native-elements'

import styles from './styles'
import clr from '../../../../config/colors'

const ListHeader = ({ title }) => (
  <View style={styles.headerCont}>
    <Text style={styles.headerText}>{title}</Text>
    <Icon
      name="add-circle"
      color={clr.black}
      size={28}
    />
  </View>
)
ListHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ListHeader

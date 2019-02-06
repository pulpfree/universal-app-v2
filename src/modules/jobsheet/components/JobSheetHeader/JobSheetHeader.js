import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import { Button, Icon } from 'react-native-elements'

import styles from './styles'

const Header = ({ jobSheet }) => (
  <View style={styles.headerCont}>
    <Text style={styles.headerText}>
      {jobSheet.customerID.name.first}
      &nbsp;
      {jobSheet.customerID.name.last}
      &nbsp;&mdash;&nbsp;
      {jobSheet.addressID.street1}
      ,&nbsp;
      {jobSheet.addressID.city}
    </Text>
  </View>
)
Header.propTypes = {
  jobSheet: PropTypes.instanceOf(Object).isRequired,
}

const Menu = ({ navigation }) => (
  <View style={styles.navBar}>
    <Button
      icon={{
        containerStyle: styles.navButtonIconCont,
        iconStyle: styles.navButtonIcon,
        name: 'ios-trash',
        size: 35,
        type: 'ionicon',
      }}
      title="Delete"
      type="clear"
      buttonStyle={styles.navButton}
      titleStyle={styles.navButtonTitle}
    />
    <Button
      icon={{
        containerStyle: styles.navButtonIconCont,
        iconStyle: styles.navButtonIcon,
        name: 'page-multiple',
        size: 30,
        type: 'foundation',
      }}
      title="Create Quote"
      type="clear"
      buttonStyle={styles.navButton}
      titleStyle={styles.navButtonTitle}
    />
  </View>
)

export { Header, Menu }

import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-native-elements'

import { LogoutButton } from '../LogoutButton'
import clr from '../../../../config/colors'
import styles from './styles'

import { Logout } from '../../../auth/components/Logout'

export default function Menu({ navigation }) {
  return (
    <React.Fragment>
      <Button
        buttonStyle={styles.button}
        icon={{
          name: 'page-multiple',
          type: 'foundation',
          color: clr.white,
          size: 32,
        }}
        onPress={() => navigation.navigate('QuoteSearch')}
        title="Search Quotes"
      />
      <Button
        buttonStyle={styles.button}
        icon={{
          name: 'group',
          color: clr.white,
          size: 32,
        }}
        onPress={() => navigation.navigate('CustomerSearch')}
        title="Search Customers"
      />
      <Button
        buttonStyle={styles.button}
        icon={{
          name: 'person',
          color: clr.white,
          size: 32,
        }}
        onPress={() => navigation.navigate('CustomerNew')}
        title="Add Customer"
      />
      <LogoutButton />
    </React.Fragment>
  )
}
Menu.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

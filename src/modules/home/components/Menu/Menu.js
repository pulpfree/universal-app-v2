import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-native-elements'

import { LogoutButton } from '../LogoutButton'
import clr from '../../../../config/colors'
import styles from './styles'


export default function Menu({
  loggedIn,
  navigation,
  setLoggedIn,
}) {
  return (
    <React.Fragment>
      {loggedIn && (
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
            onPress={() => navigation.navigate('CustomerRecent')}
            title="Recent Customers"
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
        </React.Fragment>
      )}
      <LogoutButton setLoggedIn={setLoggedIn} />
    </React.Fragment>
  )
}
Menu.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

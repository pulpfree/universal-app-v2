import React from 'react'
import PropTypes from 'prop-types'

import { Button, Icon } from 'react-native-elements'

import clr from '../../../../config/colors'
import styles from './styles'

export default function Menu({ navigation }) {
  return (
    <React.Fragment>
      <Button
        onPress={() => navigation.navigate('QuoteSearch')}
        title="Search Quotes"
        buttonStyle={styles.button}
        icon={(
          <Icon
            name="search"
            color={clr.white}
          />
        )}
      />
      <Button
        onPress={() => navigation.navigate('CustomerSearch')}
        title="Search Customers"
        buttonStyle={styles.button}
        icon={(
          <Icon
            name="search"
            color={clr.white}
          />
        )}
      />
      <Button
        onPress={() => navigation.navigate('CustomerNew')}
        title="Add Customer"
        buttonStyle={styles.button}
        icon={(
          <Icon
            name="plus"
            type="feather"
            color={clr.white}
          />
        )}
      />
    </React.Fragment>
  )
}
Menu.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

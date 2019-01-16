import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import styles from './styles'
import clr from '../../../../config/colors'

export default function ContactSheet({ navigation }) {
  const data = navigation.getParam('customer')
  const mobile = data.phones.find(ph => (ph._id === 'mobile'))
  const home = data.phones.find(ph => (ph._id === 'home'))

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {`${data.name.first} ${data.name.last}`}
      </Text>
      <View style={styles.row}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{data.email}</Text>
        <Icon
          name="send"
          type="font-awesome"
          color={clr.primary}
          onPress={() => console.log('hello')}
          containerStyle={styles.button}
          size={30}
        />
      </View>
      {mobile
        && (
          <View style={styles.row}>
            <Text style={styles.label}>Mobile Phone</Text>
            <Text style={styles.value}>{mobile.number}</Text>
            <Icon
              name="ios-text"
              type="ionicon"
              color={clr.primary}
              onPress={() => console.log('hello')}
              containerStyle={styles.button}
              size={30}
            />
            <Icon
              name="phone"
              type="font-awesome"
              color={clr.primary}
              onPress={() => console.log('hello')}
              containerStyle={styles.button}
              size={30}
            />
          </View>
        )
      }
      {home
        && (
          <View style={styles.row}>
            <Text style={styles.label}>Home Phone</Text>
          </View>
        )
      }
      <View style={styles.row}>
        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{`${data.address.street1}, ${data.address.city}`}</Text>
        <Icon
          name="map"
          type="font-awesome"
          color={clr.primary}
          onPress={() => console.log('hello')}
          containerStyle={styles.button}
          size={30}
        />
      </View>

      <Button
        onPress={() => navigation.goBack()}
        raised
        title="Close"
        buttonStyle={{
          backgroundColor: clr.black,
          marginTop: 20,
          width: 200,
        }}
        icon={(
          <Icon
            name="close"
            color={clr.white}
          />
        )}
      />

    </View>
  )
}
ContactSheet.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

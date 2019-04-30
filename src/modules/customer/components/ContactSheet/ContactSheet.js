import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  Text,
  View,
} from 'react-native'
import Mailer from 'react-native-mail'
import SendSMS from 'react-native-sms'
import { Icon } from 'react-native-elements'

import styles from './styles'
import clr from '../../../../config/colors'
import { linkCall, linkMessage } from '../../../../util/links'

const handleEmail = (customer) => {
  const params = {
    recipients: [customer.email],
  }
  Mailer.mail(params, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        { text: 'Ok' },
      ],
      { cancelable: true }
    )
  })
}

const handleSMS = (mobile) => {
  SendSMS.send({
    recipients: [mobile],
    successTypes: ['sent', 'queued'],
  }, (completed, cancelled, error) => {
    console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + ' error: ' + error) // eslint-disable-line
  })
  return true
}

export default function ContactSheet({ navigation }) {
  const customer = navigation.getParam('customer')
  const { email } = customer
  const mobile = customer.phones.find(ph => (ph._id === 'mobile'))
  const home = customer.phones.find(ph => (ph._id === 'home'))

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={{ width: 30 }} />
          <Text style={styles.headerText}>Customer Contact Info</Text>
          <Icon
            name="close"
            onPress={() => navigation.goBack()}
            size={30}
            color={clr.white}
            containerStyle={styles.iconCont}
          />
        </View>

        <View style={styles.infoCont}>
          <Text style={styles.name}>
            {`${customer.name.first} ${customer.name.last}`}
          </Text>

          {email && (
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{customer.email}</Text>
              <Icon
                color={clr.primary}
                containerStyle={styles.button}
                name="ios-mail"
                onPress={() => handleEmail(customer)}
                size={30}
                type="ionicon"
              />
            </View>
          )}

          {mobile && (
            <View style={styles.row}>
              <Text style={styles.label}>Mobile Phone</Text>
              <Text style={styles.value}>{mobile.number}</Text>
              <Icon
                color={clr.primary}
                containerStyle={styles.button}
                name="ios-text"
                onPress={() => handleSMS(mobile.number)}
                size={30}
                type="ionicon"
              />
              <Icon
                color={clr.primary}
                containerStyle={styles.button}
                name="phone"
                onPress={() => linkCall(mobile.number)}
                size={30}
                type="font-awesome"
              />
            </View>
          )}

          {home && (
            <View style={styles.row}>
              <Text style={styles.label}>Home Phone</Text>
              <Text style={styles.value}>{home.number}</Text>
              <Icon
                color={clr.primary}
                containerStyle={styles.button}
                name="phone"
                onPress={() => linkCall(home.number)}
                size={30}
                type="font-awesome"
              />
            </View>
          )}

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{`${customer.address.street1}, ${customer.address.city}`}</Text>
            <Icon
              name="map"
              type="font-awesome"
              color={clr.primary}
              // onPress={() => console.log('hello')}
              containerStyle={styles.button}
              size={30}
            />
          </View>

        </View>
      </View>
    </View>
  )
}
ContactSheet.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

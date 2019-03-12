import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import styles from './styles'
import clr from '../../../../config/colors'
import { linkEmail, linkCall, linkMessage } from '../../../../util/links'

export default function ContactSheet({ navigation }) {
  const data = navigation.getParam('customer')
  const mobile = data.phones.find(ph => (ph._id === 'mobile'))
  const home = data.phones.find(ph => (ph._id === 'home'))

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
            {`${data.name.first} ${data.name.last}`}
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.email}</Text>
            {data.email && (
              <Icon
                color={clr.primary}
                containerStyle={styles.button}
                name="ios-mail"
                onPress={() => linkEmail(data.email)}
                size={30}
                type="ionicon"
              />
            )}
          </View>

          {mobile && (
            <View style={styles.row}>
              <Text style={styles.label}>Mobile Phone</Text>
              <Text style={styles.value}>{mobile.number}</Text>
              <Icon
                color={clr.primary}
                containerStyle={styles.button}
                name="ios-text"
                onPress={() => linkMessage(mobile.number)}
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
            <Text style={styles.value}>{`${data.address.street1}, ${data.address.city}`}</Text>
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

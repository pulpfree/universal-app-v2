import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import clr from '../../../../config/colors'
import styles from './styles'
import { ucFirst } from '../../../../util/fmt'

export default function CustomerInfo({ customer, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoCont}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>First</Text>
            <Text style={styles.value}>{customer.name.first}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Last</Text>
            <Text style={styles.value}>{customer.name.last}</Text>
          </View>
          {customer.name.spouse !== '' && (
            <View style={styles.row}>
              <Text style={styles.label}>Spouse</Text>
              <Text style={styles.value}>{customer.name.spouse}</Text>
            </View>
          )}
        </View>

        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Street</Text>
            <Text style={styles.value}>{customer.address.street1}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>{customer.address.city}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Postal Code</Text>
            <Text style={styles.value}>{customer.address.postalCode}</Text>
          </View>
        </View>

        <View style={styles.column}>
          {customer.email && customer.email !== '' && (
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{customer.email}</Text>
            </View>
          )}
          {customer.phones.map(ph => (
            <View key={ph._id} style={styles.row}>
              <Text style={styles.label}>{ucFirst(ph._id)}</Text>
              <Text style={styles.value}>{ph.number}</Text>
            </View>
          ))}
        </View>

        <View style={styles.column}>
          <Button
            buttonStyle={{
              backgroundColor: clr.primary,
            }}
            icon={{
              name: 'phone',
              color: clr.white,
            }}
            onPress={() => navigation.navigate('ContactSheet', { customer, navigation })}
            raised
            rounded
            title="Contact"
            titleStyle={{
              color: clr.white,
            }}
            style={styles.button}
          />
          <View style={styles.spacer} />
          <Button
            buttonStyle={{
              backgroundColor: clr.black,
            }}
            onPress={() => navigation.navigate('CustomerInfoMenu', { customer })}
            raised
            rounded
            icon={{
              type: 'ionicon',
              name: 'ios-cog',
              color: clr.white,
            }}
            title="Options"
            style={styles.button}
          />
        </View>
      </View>
      {customer.notes !== '' && (
        <View style={styles.notesCont}>
          <Text style={[styles.notesText, { marginRight: 10 }]}>Notes:</Text>
          <Text style={styles.notesText}>{customer.notes}</Text>
        </View>
      )}
    </View>
  )
}
CustomerInfo.propTypes = {
  customer: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

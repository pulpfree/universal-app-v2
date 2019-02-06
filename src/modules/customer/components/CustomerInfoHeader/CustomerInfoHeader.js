import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import styles from './styles'
import clr from '../../../../config/colors'
import { ucFirst } from '../../../../util/fmt'

export default function CustomerInfo({ data, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.label}>First</Text>
          <Text style={styles.value}>{data.name.first}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last</Text>
          <Text style={styles.value}>{data.name.last}</Text>
        </View>
        {data.name.spouse && (
          <View style={styles.row}>
            <Text style={styles.label}>Spouse</Text>
            <Text style={styles.value}>{data.name.spouse}</Text>
          </View>
        )}
      </View>
      <View style={styles.column}>
        <View style={styles.row}>
          <Text style={styles.label}>Street</Text>
          <Text style={styles.value}>{data.address.street1}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <Text style={styles.value}>{data.address.city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Postal Code</Text>
          <Text style={styles.value}>{data.address.postalCode}</Text>
        </View>
      </View>
      <View style={styles.column}>
        {data.email && (
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.email}</Text>
          </View>
        )}
        {data.phones.map(ph => (
          <View key={ph._id} style={styles.row}>
            <Text style={styles.label}>{ucFirst(ph._id)}</Text>
            <Text style={styles.value}>{ph.number}</Text>
          </View>
        ))}
      </View>
      <View style={styles.column}>
        <Button
          onPress={() => navigation.navigate('ContactSheet', { customer: data, navigation })}
          raised
          rounded
          icon={{
            name: 'phone',
            color: clr.white,
          }}
          buttonStyle={{
            backgroundColor: clr.primary,
          }}
          titleStyle={{
            color: clr.white,
          }}
          title="Contact"
          style={styles.button}
        />
        <View style={styles.spacer} />
        <Button
          raised
          rounded
          icon={{
            name: 'clear',
            color: clr.white,
          }}
          title="Deactivate"
          style={styles.button}
          buttonStyle={{
            backgroundColor: clr.black,
          }}
        />
      </View>
    </View>
  )
}
CustomerInfo.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
}

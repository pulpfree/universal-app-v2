import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import {
  Picker,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native'
// import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-elements'

import styles from './styles'
import { PaymentTypes } from '../../config/constants'

// for handling state (or context) between these components, have a look at:
// https://stackoverflow.com/questions/53451584/is-it-possible-to-share-states-between-components-using-the-usestate-hook-in-r
function PaymentList() {
  return (
    <View style={styles.paymentCont}>
      <View style={styles.paymentHeading}>
        <Text style={styles.paymentHeadingText}>Amount</Text>
        <Text style={styles.paymentHeadingText}>Type</Text>
        <Text style={styles.paymentHeadingText}>Date</Text>
      </View>
      <TouchableOpacity onPress={() => console.log('touch payment')}>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentCell}>500.00</Text>
          <Text style={styles.paymentCell}>E-Transfer</Text>
          <Text style={styles.paymentCell}>Mar. 21st 2019</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

// let's look at using: https://github.com/trojanowski/react-apollo-hooks
// for this form
export default function PaymentForm() {
  const [paymentType, setPaymentType] = useState('')
  const [paymentAmount, setPaymentAmount] = useState(0.00)

  return (
    <View style={styles.container}>
      <View style={[styles.cell, { flex: 0.7 }]}>
        <View style={styles.formCell}>
          <Text style={styles.cellLabel}>Amount</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => setPaymentAmount(text)}
            placeholder="Enter dollar amount"
            selectTextOnFocus
            style={styles.textInput}
            value={paymentAmount.toString()}
          />
        </View>

        <View style={styles.formCell}>
          <Text style={styles.cellLabel}>Type</Text>
          <Picker
            itemStyle={styles.pickerItem}
            onValueChange={value => setPaymentType(value)}
            selectedValue={paymentType}
            style={styles.picker}
          >
            <Picker.Item label="Select Type" value="" />
            {PaymentTypes.map(pt => (
              <Picker.Item
                key={pt.key}
                label={pt.label}
                value={pt.key}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.buttonRow}>
          <Button
            // disabled={loading}
            // onPress={() => _handleRemove(jobSheetRemove, jobSheet._id)}
            title="Save"
            type="solid"
            buttonStyle={[styles.button, { marginRight: 20 }]}
            titleStyle={styles.buttonTitle}
          />
          <Button
            // disabled={loading}
            // onPress={() => _handleRemove(jobSheetRemove, jobSheet._id)}
            title="Delete"
            type="solid"
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
          />
        </View>

      </View>

      <View style={styles.cell}>
        <Text style={styles.headingText}>Payment History</Text>
        <PaymentList />
      </View>
    </View>
  )
}

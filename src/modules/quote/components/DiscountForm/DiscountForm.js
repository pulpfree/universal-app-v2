import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TextInput,
  View,
} from 'react-native'

import { Button, Icon } from 'react-native-elements'
import { Mutation } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { SET_DISCOUNT } from '../../mutations/local'

import clr from '../../../../config/colors'
import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'

function DiscountForm({ navigation }) {
  const quotePrice = navigation.getParam('quotePrice')

  const [discount, setDiscount] = useState('')
  const [description, setDescription] = useState(null)

  const descriptionField = useRef(null)

  const _validate = (number) => {
    const floatVal = parseFloat(number)
    if (isNaN(floatVal)) { // eslint-disable-line
      setDiscount(0.00)
    } else {
      setDiscount(floatVal)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={{ width: 30 }} />
          <Text style={styles.headerText}>Set Quote Discount</Text>
          <Icon
            name="close"
            onPress={() => navigation.goBack()}
            size={30}
            color={clr.white}
            containerStyle={styles.iconCont}
          />
        </View>

        <View style={styles.formCont}>
          <View style={[styles.cell, { flex: 0.65 }]}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Subtotal</Text>
              <Text style={styles.infoValue}>{fmtMoney(quotePrice.subtotal, 2, true)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tax</Text>
              <Text style={styles.infoValue}>{fmtMoney(quotePrice.tax, 2, true)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total</Text>
              <Text style={styles.infoValue}>{fmtMoney(quotePrice.total, 2, true)}</Text>
            </View>
            <TextInput
              autoFocus
              keyboardType="numeric"
              onChangeText={text => _validate(text)}
              onSubmitEditing={() => descriptionField.current.focus()}
              placeholder="Enter new Total"
              returnKeyType="next"
              style={[styles.optInput, { width: 190, marginTop: 20 }]}
              value={discount.toString()}
            />
          </View>

          <View style={[styles.cell, { marginLeft: 30 }]}>
            <TextInput
              autoCorrect
              onChangeText={text => setDescription(text)}
              ref={descriptionField}
              multiline
              placeholder="Enter description"
              style={[styles.optInput, { height: 150, width: 280, lineHeight: 22 }]}
              value={description}
            />
            <Mutation mutation={SET_DISCOUNT}>
              {setQuoteDiscount => (
                <Button
                  disabled={!discount}
                  onPress={() => {
                    setQuoteDiscount({ variables: { discount, description } })
                    navigation.goBack()
                  }}
                  title="Save Discount"
                  buttonStyle={styles.submitButton}
                  icon={{
                    name: 'ios-send',
                    type: 'ionicon',
                    color: 'white',
                  }}
                />
              )}
            </Mutation>
          </View>

        </View>
      </View>
    </View>
  )
}
DiscountForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(DiscountForm)

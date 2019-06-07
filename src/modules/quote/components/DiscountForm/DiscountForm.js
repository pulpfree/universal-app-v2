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
import { PERSIST_QUOTE_DISCOUNT } from '../../mutations/remote'
import { CUSTOMER_DATA } from '../../../customer/queries'

import clr from '../../../../config/colors'
import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'
import { calculateDiscount } from '../../utils'
import { Error } from '../../../common/components/Error'

function DiscountForm({ navigation }) {
  const quote = navigation.getParam('quote')
  const customerID = navigation.getParam('customerID', null)
  const { quotePrice, itemCosts } = quote

  const [errorMsg, setErrorMsg] = useState('')
  const [discount, setDiscount] = useState('')
  const [description, setDescription] = useState('')

  const descriptionField = useRef(null)

  const _validate = (number) => {
    const floatVal = parseFloat(number)
    if (isNaN(floatVal)) { // eslint-disable-line
      setDiscount(0.00)
    } else {
      setDiscount(floatVal)
    }
  }

  const docLabel = quote.invoiced ? 'Invoice' : 'Quote'

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={{ width: 30 }} />
          <Text style={styles.headerText}>{`Set ${docLabel} Discount`}</Text>
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
            <View style={styles.itemsTotalRow}>
              <Text style={styles.infoLabel}>Items Total</Text>
              <Text style={styles.infoValue}>{fmtMoney(itemCosts.subtotal, 2, true)}</Text>
            </View>
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
            {quote.invoiced === true ? (
              <Mutation
                mutation={PERSIST_QUOTE_DISCOUNT}
                onCompleted={() => navigation.navigate('CustomerInfo', { customerID })}
                refetchQueries={[
                  { query: CUSTOMER_DATA, variables: { customerID } },
                ]}
              >
                {(quotePersistDiscount, { error, loading }) => {
                  if (error) setErrorMsg(error)
                  return (
                    <Button
                      disabled={!discount || loading}
                      onPress={() => {
                        quotePersistDiscount(
                          { variables: { input: calculateDiscount(quote, discount, description) } }
                        )
                      }}
                      title="Save Discount"
                      buttonStyle={styles.submitButton}
                      icon={{
                        name: 'ios-send',
                        type: 'ionicon',
                        color: 'white',
                      }}
                    />
                  )
                }}
              </Mutation>
            ) : (
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
            )}
          </View>
        </View>
        <View style={{ marginTop: 10, height: 200 }}>
          {errorMsg !== '' && <Error error={errorMsg} />}
        </View>
      </View>
    </View>
  )
}
DiscountForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(DiscountForm)

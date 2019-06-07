import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Picker,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-elements'
import { Mutation, Query } from 'react-apollo'

import { PAYMENTS, QUOTE_PAYMENT } from '../../queries.remote'
import { PERSIST_PAYMENT, REMOVE_PAYMENT } from '../../mutations/remote'
import { CUSTOMER_DATA } from '../../../customer/queries'

import styles from './styles'
import { PaymentTypes } from '../../config/constants'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'
import { fmtHumanDate, fmtMoney } from '../../../../util/fmt'

// for handling state (or context) between these components, have a look at:
// https://stackoverflow.com/questions/53451584/is-it-possible-to-share-states-between-components-using-the-usestate-hook-in-r
function PaymentList({ payments, payID, popFunc }) {
  return (
    <View style={styles.paymentCont}>
      <View style={styles.paymentHeading}>
        <Text style={styles.paymentHeadingText}>Amount</Text>
        <Text style={styles.paymentHeadingText}>Type</Text>
        <Text style={[styles.paymentHeadingText, { flex: 1.5 }]}>Date</Text>
      </View>

      {payments.length > 0
        && payments.map((p) => {
          const t = PaymentTypes.find(pt => pt.key === p.type)

          return (
            <TouchableOpacity key={p._id} onPress={() => popFunc(p)}>
              <View style={[styles.paymentRow, p._id === payID && styles.paymentRowHiLite]}>
                <Text style={styles.paymentCell}>{fmtMoney(p.amount, 0, true)}</Text>
                <Text style={styles.paymentCell}>{t.label}</Text>
                <Text style={[styles.paymentCell, { flex: 1.5 }]}>{fmtHumanDate(p.updatedAt)}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}
PaymentList.propTypes = {
  payments: PropTypes.instanceOf(Object).isRequired,
  payID: PropTypes.string,
  popFunc: PropTypes.func.isRequired,
}
PaymentList.defaultProps = {
  payID: null,
}

// let's look at using: https://github.com/trojanowski/react-apollo-hooks
// for this form
function PaymentForm({ navigation }) {
  const quote = navigation.getParam('quote')
  const customerID = navigation.getParam('customerID')
  const quoteID = quote._id

  const [errorMsg, setErrorMsg] = useState('')
  const [paymentType, setPaymentType] = useState('')
  const [paymentAmount, setPaymentAmount] = useState(0.00)
  const [paymentID, setPaymentID] = useState(null)

  const payVariables = () => {
    const vars = {
      amount: paymentAmount,
      quoteID,
      type: paymentType,
    }
    if (paymentID) vars._id = paymentID
    return vars
  }

  const populatePayment = (payment) => {
    setPaymentType(payment.type)
    setPaymentAmount(payment.amount)
    setPaymentID(payment._id)
  }

  const clearPayment = () => {
    setPaymentType('')
    setPaymentAmount(0.00)
    setPaymentID(null)
  }

  return (
    <View style={styles.container}>
      <Query
        query={PAYMENTS}
        variables={{ quoteID }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (error) return <Error error={errorMsg} />
          if (loading) return <Loader />
          const { payments } = data

          return (
            <View style={styles.formCont}>
              <View style={[styles.cell, { flex: 0.7 }]}>
                <View style={styles.formCell}>
                  <Text style={styles.cellLabel}>Amount</Text>
                  <TextInput
                    keyboardType="numeric"
                    onChangeText={text => setPaymentAmount(parseFloat(text))}
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
                  <Mutation
                    mutation={PERSIST_PAYMENT}
                    onCompleted={() => clearPayment()}
                    refetchQueries={[
                      { query: CUSTOMER_DATA, variables: { customerID } },
                      { query: QUOTE_PAYMENT, variables: { quoteID } },
                      { query: PAYMENTS, variables: { quoteID } },
                    ]}
                  >
                    {(paymentPersist, { error: payError, loading: payLoading }) => {
                      if (payError) setErrorMsg(payError)
                      return (
                        <Button
                          disabled={payLoading || !paymentAmount || !paymentType}
                          onPress={() => paymentPersist(
                            { variables: { input: payVariables() } }
                          )}
                          title={payLoading ? 'Loading...' : 'Save'}
                          type="solid"
                          buttonStyle={[styles.button, { marginRight: 20 }]}
                          titleStyle={styles.buttonTitle}
                        />
                      )
                    }}
                  </Mutation>

                  <Button
                    disabled={!paymentID}
                    onPress={() => clearPayment()}
                    title="Clear"
                    type="solid"
                    buttonStyle={[styles.button, { marginRight: 20 }]}
                    titleStyle={styles.buttonTitle}
                  />

                  <Mutation
                    mutation={REMOVE_PAYMENT}
                    onCompleted={() => clearPayment()}
                    refetchQueries={[
                      { query: CUSTOMER_DATA, variables: { customerID } },
                      { query: PAYMENTS, variables: { quoteID } },
                    ]}
                  >
                    {(paymentRemove, { error: removeError, loading: removeLoading }) => {
                      if (removeError) setErrorMsg(removeError)

                      return (
                        <Button
                          disabled={!paymentID || removeLoading}
                          onPress={() => paymentRemove(
                            { variables: { id: paymentID } }
                          )}
                          title={removeLoading ? 'Loading...' : 'Delete'}
                          type="solid"
                          buttonStyle={styles.button}
                          titleStyle={styles.buttonTitle}
                        />
                      )
                    }}
                  </Mutation>
                </View>
              </View>

              <View style={styles.cell}>
                <Text style={styles.headingText}>Payment History</Text>
                <PaymentList payments={payments} popFunc={populatePayment} payID={paymentID} />
              </View>
            </View>
          )
        }}
      </Query>

      <View style={{ marginTop: 10, flex: 1, minHeight: 50 }}>
        {errorMsg !== '' && <Error error={errorMsg} />}
      </View>
    </View>
  )
}
PaymentForm.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(PaymentForm)

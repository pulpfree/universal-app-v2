import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-elements'
import { Mutation, Query } from 'react-apollo'

import { REMOVE_QUOTE } from '../../mutations/remote'
import { CUSTOMER, CUSTOMER_DATA } from '../../../customer/queries'

import { fmtHumanDate, fmtMoney } from '../../../../util/fmt'
import { ModalHeader } from '../../../common/components/ModalHeader'
import styles from './styles'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'

function DeleteInvoice({ navigation }) {
  const [errorMsg, setErrorMsg] = useState('')

  const quote = navigation.getParam('quote')
  const customerID = navigation.getParam('customerID')
  const address = quote.jobsheetID.addressID

  return (
    <Query
      query={CUSTOMER}
      variables={{ customerID }}
    >
      {({ loading, error, data: customerData }) => {
        if (error) return <Error error={errorMsg} />
        if (loading) return <Loader />
        const { customer } = customerData

        return (
          <View style={styles.container}>
            <View style={styles.modalBox}>
              <ModalHeader title="Delete Invoice" />

              <View style={styles.infoCont}>
                <View style={styles.infoCell}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Customer</Text>
                    <Text style={styles.infoValue}>
                      {`${customer.name.first} ${customer.name.last}`}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>
                      {`${address.street1}, ${address.city}`}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Last Updated</Text>
                    <Text style={styles.infoValue}>{fmtHumanDate(quote.updatedAt)}</Text>
                  </View>
                </View>

                <View style={styles.infoCell}>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Invoice</Text>
                    <Text style={styles.infoValue}>{quote.number}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Total Cost</Text>
                    <Text style={styles.infoValue}>
                      {fmtMoney(quote.quotePrice.total, 0, true, true)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.formCont}>
                <Text style={styles.warnText}>
                  Are you certain you want to delete this invoice?
                </Text>
                <View style={styles.buttonRow}>
                  <Mutation
                    mutation={REMOVE_QUOTE}
                    onCompleted={() => navigation.navigate('CustomerInfo', { customerID })}
                    refetchQueries={[
                      { query: CUSTOMER_DATA, variables: { customerID } },
                    ]}
                  >
                    {(quoteRemove, { error: qteError, loading: qteLoading }) => {
                      if (qteError) setErrorMsg(qteError)
                      return (
                        <Button
                          disabled={qteLoading}
                          onPress={() => quoteRemove(
                            { variables: { id: quote._id } }
                          )}
                          title={qteLoading ? 'Stand by...' : 'Yes Delete Invoice'}
                          type="solid"
                          buttonStyle={styles.button}
                          titleStyle={styles.buttonTitle}
                        />
                      )
                    }}
                  </Mutation>

                  <Button
                    onPress={() => navigation.goBack()}
                    title="Cancel"
                    type="solid"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonTitle}
                  />
                </View>
              </View>
              <View style={{ marginTop: 10, flex: 1 }}>
                {errorMsg !== '' && <Error error={errorMsg} />}
              </View>
            </View>
          </View>
        )
      }}
    </Query>
  )
}
DeleteInvoice.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(DeleteInvoice)

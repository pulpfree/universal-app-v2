import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { Query } from 'react-apollo'

import { CUSTOMER } from '../../../customer/queries'
import { QUOTE_PAYMENT } from '../../queries.remote'

import { fmtMoney } from '../../../../util/fmt'
import styles from './styles'
import { Error } from '../../../common/components/Error'
import { Loader } from '../../../common/components/Loader'

function PaymentInfo({ navigation }) {
  const quote = navigation.getParam('quote')
  const customerID = navigation.getParam('customerID')
  const quoteID = quote._id

  return (
    <Query
      query={CUSTOMER}
      variables={{ customerID }}
    >
      {({ loading, error, data: customerData }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        const { customer } = customerData

        return (
          <View style={styles.container}>
            <View style={styles.cell}>
              <View style={styles.row}>
                <Text style={styles.label}>Customer</Text>
                <Text style={styles.value}>
                  {`${customer.name.first} ${customer.name.last}`}
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Invoice</Text>
                <Text style={styles.value}>{quote.number}</Text>
              </View>

              <View style={styles.row} />
            </View>

            <Query
              query={QUOTE_PAYMENT}
              variables={{ quoteID }}
            >
              {({ loading: qteLoading, error: qteError, data }) => {
                if (error) return <Error error={qteError} />
                if (qteLoading) return <Loader />
                const { quotePrice } = data.quote

                return (
                  <View style={styles.cell}>
                    <View style={styles.row}>
                      <Text style={styles.label}>Total Cost</Text>
                      <Text style={[styles.value, styles.right]}>
                        {fmtMoney(quotePrice.total, 0, true)}
                      </Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={styles.label}>Total Payments</Text>
                      <Text style={[styles.value, styles.right]}>
                        {fmtMoney(quotePrice.payments, 0, true)}
                      </Text>
                    </View>

                    <View style={styles.row}>
                      <Text style={[styles.label, styles.bold]}>Total Owing</Text>
                      <Text style={[styles.value, styles.bold, styles.right]}>
                        {fmtMoney(quotePrice.outstanding, 0, true)}
                      </Text>
                    </View>
                  </View>
                )
              }}
            </Query>
          </View>
        )
      }}
    </Query>
  )
}
PaymentInfo.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(PaymentInfo)

import React from 'react'
import PropTypes from 'prop-types'

import {
  View,
} from 'react-native'

import { Query } from 'react-apollo'

import { CustomerInfoHeader } from '../components/CustomerInfoHeader'
import { CustomerQuoteList } from '../components/CustomerQuoteList'
import { JobSheetList } from '../../jobsheet/components/JobSheetList'

import CustomerData from '../queries/CustomerData'
import { Error } from '../../common/components/Error'
import { Loader } from '../../common/components/Loader'


export default function CustomerInfo({ navigation }) {
  const customerID = navigation.getParam('customerID')

  return (
    <Query
      query={CustomerData}
      skip={!customerID}
      variables={{ customerID }}
    >
      {({ loading, error, data }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />

        const { getCustomer, searchJobSheetsByCustomer, searchQuotesByCustomer } = data
        return (
          <View>
            <CustomerInfoHeader data={getCustomer} navigation={navigation} />
            <JobSheetList data={searchJobSheetsByCustomer} />
            <CustomerQuoteList data={searchQuotesByCustomer} />
          </View>
        )
      }}
    </Query>
  )
}
CustomerInfo.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

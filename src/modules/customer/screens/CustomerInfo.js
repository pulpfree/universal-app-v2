import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { Query } from 'react-apollo'

import { CUSTOMER_DATA } from '../queries'

import { CustomerInfoHeader } from '../components/CustomerInfoHeader'
import { CustomerQuoteList } from '../components/CustomerQuoteList'
import { Error } from '../../common/components/Error'
import { JobSheetList } from '../../jobsheet/components/JobSheetList'
import { Loader } from '../../common/components/Loader'

// todo: issue regarding Flatlist inside ScrollView, see:
// Voliki comment: https://github.com/facebook/react-native/issues/19971
// and sadafk831 comment: https://github.com/facebook/react-native/issues/1966#issuecomment-285130701

export default function CustomerInfo({ navigation }) {
  const customerID = navigation.getParam('customerID')

  return (
    <Query
      query={CUSTOMER_DATA}
      skip={!customerID}
      variables={{ customerID }}
      fetchPolicy="cache-and-network"
    >
      {({
        loading,
        error,
        data,
        networkStatus,
        refetch,
      }) => {
        if (error) return <Error error={error} />
        if (loading) return <Loader />
        const { customer, searchJobSheetsByCustomer, searchQuotesByCustomer } = data
        return (
          <ScrollView>
            <CustomerInfoHeader
              customer={customer}
              navigation={navigation}
            />
            <JobSheetList
              data={searchJobSheetsByCustomer}
              customer={customer}
            />
            <CustomerQuoteList
              data={searchQuotesByCustomer}
              networkStatus={networkStatus}
              refetch={refetch}
            />
          </ScrollView>
        )
      }}
    </Query>
  )
}
CustomerInfo.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

import React from 'react'
// import PropTypes from 'prop-types'

// import {
//   View,
// } from 'react-native'

import { CustomerSearch as SearchBox } from '../components/CustomerSearch'
import { CustomerSearchList } from '../components/CustomerSearchList'
import { SearchProvider } from '../../common/components/SearchContext'
// import { customers } from '../../../../storybook/mockData/customer'

const CustomerSearch = () => (
  <SearchProvider>
    <SearchBox />
    <CustomerSearchList />
  </SearchProvider>
)

export default CustomerSearch

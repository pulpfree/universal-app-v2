import React from 'react'

import { CustomerSearch as SearchBox } from '../components/CustomerSearch'
import { CustomerSearchList } from '../components/CustomerSearchList'
import { SearchProvider } from '../components/SearchContext'

const CustomerSearch = () => (
  <SearchProvider>
    <SearchBox />
    <CustomerSearchList />
  </SearchProvider>
)

export default CustomerSearch

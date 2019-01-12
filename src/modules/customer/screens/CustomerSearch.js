import React from 'react'
// import PropTypes from 'prop-types'

import {
  View,
} from 'react-native'

import { CustomerSearch as SearchBox } from '../components/CustomerSearch'
import { CustomerSearchList } from '../components/CustomerSearchList'

import { customers } from '../../../../storybook/mockData/customer'

const CustomerSearch = () => (
  <View>
    <SearchBox />
    <CustomerSearchList data={customers} />
  </View>
)

export default CustomerSearch

import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  View,
} from 'react-native'

import { CustomerInfoHeader } from '../components/CustomerInfoHeader'
import { CustomerQuoteList } from '../components/CustomerQuoteList'
import { JobSheetList } from '../../jobsheet/components/JobSheetList'

import { customerInfo, quotes as customerQuotes } from '../../../../storybook/mockData/customer'
import { jobsheets } from '../../../../storybook/mockData/quotes'


class CustomerInfo extends React.Component {
  /* componentDidMount() {
    console.log('componentDidMount in CustomerInfo')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount in CustomerInfo')
  } */

  render() {
    const { navigation } = this.props
    return (
      <View>
        <CustomerInfoHeader data={customerInfo} navigation={navigation} />
        <JobSheetList data={jobsheets} />
        <CustomerQuoteList data={customerQuotes} />
      </View>
    )
  }
}
CustomerInfo.propTypes = {
  // navigation: PropTypes.instanceOf(Object).isRequired,
}

export default CustomerInfo

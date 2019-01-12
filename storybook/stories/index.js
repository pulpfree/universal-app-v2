import React from 'react'
import { ScrollView, Text } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import CenterView from './CenterView'

import CustomerSearch from '../../src/modules/customer/screens/CustomerSearch'
import CustomerInfo from '../../src/modules/customer/screens/CustomerInfo'
import { CustomerInfoHeader } from '../../src/modules/customer/components/CustomerInfoHeader'
import { CustomerQuoteList } from '../../src/modules/customer/components/CustomerQuoteList'
import { CustomerSearch as CustomerSearchBox } from '../../src/modules/customer/components/CustomerSearch'
import { CustomerSearchList } from '../../src/modules/customer/components/CustomerSearchList'

import { JobSheetList } from '../../src/modules/jobsheet/components/JobSheetList'

import QuoteSearch from '../../src/modules/quote/screens/QuoteSearch'
import { QuoteListHeader } from '../../src/modules/quote/components/QuoteListHeader'
import { QuoteSearchHeader } from '../../src/modules/quote/components/QuoteSearchHeader'
import { QuoteSearchList } from '../../src/modules/quote/components/QuoteSearchList'

import { jobsheets, quotes } from '../mockData/quotes'
import { customers, customerInfo, quotes as customerQuotes } from '../mockData/customer'


/*
* ======================== Customer =====================================
*/
storiesOf('Customer', module)
  .add('search header', () => (
    <CustomerSearchBox />
  ))
  .add('search list', () => (
    <CustomerSearchList
      data={customers}
    />
  ))
  .add('quote list', () => (
    <CustomerQuoteList
      data={customerQuotes}
    />
  ))
  .add('info header', () => (
    <CustomerInfoHeader
      data={customerInfo}
    />
  ))
  .add('jobsheet list', () => (
    <JobSheetList
      data={jobsheets}
    />
  ))
  .add('search screen', () => (
    <CustomerSearch />
  ))
  .add('info screen', () => (
    <CustomerInfo />
  ))

/*
 * ======================== Quote =====================================
 */
storiesOf('Quotes', module)
  // .addDecorator(getStory => <ScrollView>{getStory()}</ScrollView>)
  .add('search header', () => (
    <QuoteSearchHeader />
  ))
  .add('list header', () => (
    <QuoteListHeader />
  ))
  .add('search list', () => (
    <QuoteSearchList
      data={quotes}
    />
  ))
  .add('Quote Search screen', () => (
    <QuoteSearch />
  ))

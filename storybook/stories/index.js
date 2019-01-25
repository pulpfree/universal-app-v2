import React from 'react'
// import { ScrollView, Text } from 'react-native'

import { storiesOf } from '@storybook/react-native'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

// import CenterView from './CenterView'

import { AddressForm } from '../../src/modules/address/components/AddressForm'

import CustomerSearch from '../../src/modules/customer/screens/CustomerSearch'
import CustomerInfo from '../../src/modules/customer/screens/CustomerInfo'
import { CustomerInfoHeader } from '../../src/modules/customer/components/CustomerInfoHeader'
import { CustomerQuoteList } from '../../src/modules/customer/components/CustomerQuoteList'
import { CustomerSearch as CustomerSearchBox } from '../../src/modules/customer/components/CustomerSearch'
import { CustomerSearchList } from '../../src/modules/customer/components/CustomerSearchList'
import { CustomerForm } from '../../src/modules/customer/components/CustomerForm'
import { ContactSheet } from '../../src/modules/customer/components/ContactSheet'
import { SearchProvider } from '../../src/modules/common/components/SearchContext'

import JobSheetNew from '../../src/modules/jobsheet/screens/JobSheetNew'
import { JobSheetList } from '../../src/modules/jobsheet/components/JobSheetList'

import QuoteSearch from '../../src/modules/quote/screens/QuoteSearch'
import { QuoteListHeader } from '../../src/modules/quote/components/QuoteListHeader'
import { QuoteSearchHeader } from '../../src/modules/quote/components/QuoteSearchHeader'
import { QuoteSearchList } from '../../src/modules/quote/components/QuoteSearchList'

import { Container } from '../../src/modules/auth/components/Container'
import { SignIn as PfSignIn } from '../../src/modules/auth/components/SignIn'

import { jobsheets, quotes } from '../mockData/quotes'
import { customers, customerInfo, quotes as customerQuotes } from '../mockData/customer'
import clr from '../../src/config/colors'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: clr.primary,
    accent: '#f1c40f',
  },
}

/*
* ======================== Customer =====================================
*/
storiesOf('Customer', module)
  .addDecorator(getStory => <SearchProvider>{getStory()}</SearchProvider>)
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
  .add('contact sheet', () => (
    <ContactSheet data={customerInfo} />
  ))

storiesOf('Customer Form', module)
  .addDecorator(getStory => <PaperProvider theme={theme}>{getStory()}</PaperProvider>)
  .add('form', () => (
    <CustomerForm />
  ))

/*
 * ======================== Quote =====================================
 */
storiesOf('Quotes', module)
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
  .add('search screen', () => (
    <QuoteSearch />
  ))

/*
* ======================== Address =====================================
*/
storiesOf('Address', module)
  .add('address form', () => (
    <AddressForm />
  ))

/*
* ======================== JobSheet =====================================
*/
storiesOf('JobSheets', module)
  .add('new jobsheet screen', () => (
    <JobSheetNew />
  ))

/*
* ======================== Auth =====================================
*/
storiesOf('Authentication', module)
  .addDecorator(getStory => <Container>{getStory()}</Container>)
  .add('Sign In', () => (
    <PfSignIn />
  ))

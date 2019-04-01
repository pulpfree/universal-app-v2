import React from 'react'
// import { ScrollView, Text } from 'react-native'

import { storiesOf } from '@storybook/react-native'
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

// import CenterView from './CenterView'

// import { AddressForm } from '../../src/modules/address/components/AddressForm'

import CustomerSearch from '../../src/modules/customer/screens/CustomerSearch'
// import CustomerInfo from '../../src/modules/customer/screens/CustomerInfo'
import { CustomerInfoHeader } from '../../src/modules/customer/components/CustomerInfoHeader'
import { CustomerQuoteList } from '../../src/modules/customer/components/CustomerQuoteList'
import { CustomerSearch as CustomerSearchBox } from '../../src/modules/customer/components/CustomerSearch'
import { CustomerSearchList } from '../../src/modules/customer/components/CustomerSearchList'
import { CustomerForm } from '../../src/modules/customer/components/CustomerForm'
import { ContactSheet } from '../../src/modules/customer/components/ContactSheet'
import { SearchProvider } from '../../src/modules/customer/components/SearchContext'

import JobSheetNew from '../../src/modules/jobsheet/screens/JobSheetNew'
import JobSheet from '../../src/modules/jobsheet/screens/JobSheet'
import { JobSheetList } from '../../src/modules/jobsheet/components/JobSheetList'
import { GroupList } from '../../src/modules/jobsheet/components/GroupList'
import { OtherList } from '../../src/modules/jobsheet/components/OtherList'
import { WindowList } from '../../src/modules/jobsheet/components/WindowList'
import { SelectRooms } from '../../src/modules/jobsheet/components/SelectRooms'
import { SelectWindowOptions } from '../../src/modules/jobsheet/components/SelectWindowOptions'
import { SelectTrim } from '../../src/modules/jobsheet/components/SelectTrim'
import { SelectFeatures } from '../../src/modules/jobsheet/components/SelectFeatures'
// import GroupForm from '../../src/modules/jobsheet/screens/GroupForm'
import OtherForm from '../../src/modules/jobsheet/screens/OtherForm'
// import WindowForm from '../../src/modules/jobsheet/screens/WindowForm'

import Payments from '../../src/modules/quote/screens/Payments'
import QuotePreview from '../../src/modules/quote/screens/QuotePreview'
import QuoteSearch from '../../src/modules/quote/screens/QuoteSearch'
import { DeleteInvoice } from '../../src/modules/quote/components/DeleteInvoice'
import { DiscountForm } from '../../src/modules/quote/components/DiscountForm'
import { InvoiceOptions } from '../../src/modules/quote/components/InvoiceOptions'
import { QuoteForm } from '../../src/modules/quote/components/QuoteForm'
import { QuoteListHeader } from '../../src/modules/quote/components/QuoteListHeader'
import { QuoteSearchHeader } from '../../src/modules/quote/components/QuoteSearchHeader'
import { QuoteSearchList } from '../../src/modules/quote/components/QuoteSearchList'
import { SearchProvider as QuoteSearchProvider } from '../../src/modules/quote/components/SearchContext'

import { Container } from '../../src/modules/auth/components/Container'
import { SignIn as PfSignIn } from '../../src/modules/auth/components/SignIn'

import { Loader } from '../../src/modules/common/components/Loader'

import { jobsheets, quotes } from '../mockData/quotes'
import jobSheet from '../mockData/jobSheet'
import quote from '../mockData/quote'
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
  /* .add('info screen', () => (
    <CustomerInfo />
  )) */
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
  .addDecorator(getStory => <QuoteSearchProvider>{getStory()}</QuoteSearchProvider>)
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
  .add('discount form modal', () => (
    <DiscountForm />
  ))

storiesOf('QuoteForm', module)
  .add('quote form', () => (
    <QuoteForm data={quote} />
  ))

storiesOf('QuotePreview', module)
  .add('quote preview', () => (
    <QuotePreview />
  ))

storiesOf('InvoiceOptions', module)
  .add('invoice options', () => (
    <InvoiceOptions />
  ))

storiesOf('Payments', module)
  .add('payment form', () => (
    <Payments />
  ))

storiesOf('DeleteInvoice', module)
  .add('delete invoice', () => (
    <DeleteInvoice />
  ))

/*
* ======================== Address =====================================
*/
/* storiesOf('Address', module)
  .add('address form', () => (
    <AddressForm />
  )) */

/*
* ======================== JobSheet =====================================
*/
storiesOf('JobSheets', module)
  .add('new jobsheet screen', () => (
    <JobSheetNew />
  ))
  .add('jobsheet screen', () => (
    <JobSheet />
  ))
  .add('group list', () => (
    <GroupList data={jobSheet.jobSheetData.groups} />
  ))
  .add('other list', () => (
    <OtherList data={jobSheet.jobSheetData.other} />
  ))
  .add('window list', () => (
    <WindowList data={jobSheet.jobSheetData.windows} />
  ))
  /* .add('window form', () => (
    <WindowForm data={jobSheet.jobSheetData.jobsheet} />
  )) */
  /* .add('group form', () => (
    <GroupForm data={jobSheet.jobSheetData.jobsheet} />
  )) */
  /* .add('other form', () => (
    <OtherForm jobsheet={jobSheet.jobSheetData.jobsheet} />
  )) */
  .add('select rooms modal', () => (
    <SelectRooms />
  ))
  .add('select window options modal', () => (
    <SelectWindowOptions />
  ))
  .add('select trim modal', () => (
    <SelectTrim />
  ))
  .add('select job features modal', () => (
    <SelectFeatures />
  ))

/*
* ======================== Auth =====================================
*/
storiesOf('Authentication', module)
  .addDecorator(getStory => <Container>{getStory()}</Container>)
  .add('Sign In', () => (
    <PfSignIn />
  ))

/*
* ======================== Common =====================================
*/
storiesOf('Loader', module)
  .add('Loader', () => (
    <Loader />
  ))

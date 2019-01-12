import { createAppContainer, createStackNavigator } from 'react-navigation'

import QuoteSearch from '../modules/quote/screens/QuoteSearch'
import CustomerSearch from '../modules/customer/screens/CustomerSearch'
import CustomerNew from '../modules/customer/screens/CustomerNew'
import CustomerInfo from '../modules/customer/screens/CustomerInfo'
import JobSheetNew from '../modules/jobsheet/screens/JobSheetNew'
import JobSheet from '../modules/jobsheet/screens/JobSheet'
import QuoteNew from '../modules/quote/screens/QuoteNew'
import QuotePreview from '../modules/quote/screens/QuotePreview'
import Home from '../modules/home/screens/Home'

import clr from './colors'

const homeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
        header: null,
      },
    },
    QuoteSearch: {
      screen: QuoteSearch,
      navigationOptions: {
        title: 'Search Quotes',
      },
    },
    CustomerSearch: {
      screen: CustomerSearch,
      navigationOptions: {
        title: 'Search Customers',
      },
    },
    CustomerNew: {
      screen: CustomerNew,
      navigationOptions: {
        title: 'New Customer',
      },
    },
    CustomerInfo: {
      screen: CustomerInfo,
      navigationOptions: {
        title: 'Customer Details',
      },
    },
    JobSheetNew: {
      screen: JobSheetNew,
      navigationOptions: {
        title: 'Add JobSheet',
      },
    },
    JobSheet: {
      screen: JobSheet,
      navigationOptions: {
        title: 'Job Sheet',
      },
    },
    QuoteNew: {
      screen: QuoteNew,
      navigationOptions: {
        title: 'Add Quote',
      },
    },
    QuotePreview: {
      screen: QuotePreview,
      navigationOptions: {
        title: 'Quote Preview',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: clr.primary,
      },
      headerTintColor: clr.ltGray,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

// export default homeStack
export default createAppContainer(homeStack)

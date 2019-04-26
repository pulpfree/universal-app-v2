import { createAppContainer, createStackNavigator } from 'react-navigation'

import CustomerSearch from '../modules/customer/screens/CustomerSearch'
import CustomerNew from '../modules/customer/screens/CustomerNew'
import CustomerProfile from '../modules/customer/screens/CustomerProfile'
import CustomerInfo from '../modules/customer/screens/CustomerInfo'
import { CustomerInfoMenu } from '../modules/customer/components/CustomerInfoMenu'
import { DeleteCustomer } from '../modules/customer/components/DeleteCustomer'
import { ToggleActive as CustomerToggleActive } from '../modules/customer/components/ToggleActive'
import { Notes as CustomerNotes } from '../modules/customer/components/Notes'

import JobSheetNew from '../modules/jobsheet/screens/JobSheetNew'
import JobSheet from '../modules/jobsheet/screens/JobSheet'
import WorkSheet from '../modules/jobsheet/screens/WorkSheet'
import { SelectRooms } from '../modules/jobsheet/components/SelectRooms'
import { SelectWindowOptions } from '../modules/jobsheet/components/SelectWindowOptions'
import { SelectTrim } from '../modules/jobsheet/components/SelectTrim'
import { SelectFeatures } from '../modules/jobsheet/components/SelectFeatures'

import Payments from '../modules/quote/screens/Payments'
import QuoteEdit from '../modules/quote/screens/QuoteEdit'
import QuoteNew from '../modules/quote/screens/QuoteNew'
import QuotePreview from '../modules/quote/screens/QuotePreview'
import QuoteSearch from '../modules/quote/screens/QuoteSearch'
import { DeleteInvoice } from '../modules/quote/components/DeleteInvoice'
import { DiscountForm } from '../modules/quote/components/DiscountForm'
import { InvoiceOptions } from '../modules/quote/components/InvoiceOptions'

import GroupForm from '../modules/jobsheet/screens/GroupForm'
import OtherForm from '../modules/jobsheet/screens/OtherForm'
import WindowForm from '../modules/jobsheet/screens/WindowForm'

import Home from '../modules/home/screens/Home'

import { ContactSheet } from '../modules/customer/components/ContactSheet'

import clr from './colors'

const HomeStack = createStackNavigator(
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
    QuoteEdit: {
      screen: QuoteEdit,
      navigationOptions: {
        title: 'Edit Quote',
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
    CustomerProfile: {
      screen: CustomerProfile,
      navigationOptions: {
        title: 'Customer Profile',
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
    WindowForm: {
      screen: WindowForm,
      navigationOptions: {
        title: 'Window Form',
      },
    },
    GroupForm: {
      screen: GroupForm,
      navigationOptions: {
        title: 'Group Form',
      },
    },
    OtherForm: {
      screen: OtherForm,
      navigationOptions: {
        title: 'Other Item Form',
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
        title: 'PDF Preview',
      },
    },
    Payments: {
      screen: Payments,
      navigationOptions: {
        title: 'Invoice Payments',
      },
    },
    WorkSheet: {
      screen: WorkSheet,
      navigationOptions: {
        title: 'WorkSheet PDF',
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

const RootStack = createStackNavigator(
  {
    Main: {
      screen: HomeStack,
    },
    ContactSheet,
    CustomerInfoMenu,
    CustomerToggleActive,
    DiscountForm,
    DeleteCustomer,
    DeleteInvoice,
    InvoiceOptions,
    CustomerNotes,
    SelectFeatures,
    SelectRooms,
    SelectWindowOptions,
    SelectTrim,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

// export default homeStack
export default createAppContainer(RootStack)

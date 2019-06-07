import { createAppContainer, createStackNavigator } from 'react-navigation'

import CustomerInfo from '../modules/customer/screens/CustomerInfo'
import CustomerNew from '../modules/customer/screens/CustomerNew'
import CustomerProfile from '../modules/customer/screens/CustomerProfile'
import CustomerSearch from '../modules/customer/screens/CustomerSearch'
import { AddressLookup } from '../modules/customer/components/AddressLookup'
import { CustomerInfoMenu } from '../modules/customer/components/CustomerInfoMenu'
import { CustomerRecent } from '../modules/customer/components/CustomerRecent'
import { DeleteCustomer } from '../modules/customer/components/DeleteCustomer'
import { Notes as CustomerNotes } from '../modules/customer/components/Notes'
import { ToggleActive as CustomerToggleActive } from '../modules/customer/components/ToggleActive'

import JobSheet from '../modules/jobsheet/screens/JobSheet'
import JobSheetNew from '../modules/jobsheet/screens/JobSheetNew'
import WorkSheet from '../modules/jobsheet/screens/WorkSheet'
import { GroupTypeBuilder } from '../modules/jobsheet/components/GroupTypeBuilder'
import { SelectFeatures } from '../modules/jobsheet/components/SelectFeatures'
import { SelectRooms } from '../modules/jobsheet/components/SelectRooms'
import { SelectTrim } from '../modules/jobsheet/components/SelectTrim'
import { SelectWindowOptions } from '../modules/jobsheet/components/SelectWindowOptions'

import Payments from '../modules/quote/screens/Payments'
import QuoteEdit from '../modules/quote/screens/QuoteEdit'
import QuotePreview from '../modules/quote/screens/QuotePreview'
import QuoteSearch from '../modules/quote/screens/QuoteSearch'
import NearbyJobs from '../modules/quote/screens/NearbyJobs'
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
    CustomerRecent: {
      screen: CustomerRecent,
      navigationOptions: {
        title: 'Recent Customers',
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
    NearbyJobs: {
      screen: NearbyJobs,
      navigationOptions: {
        title: 'Nearby Jobs',
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
    AddressLookup,
    ContactSheet,
    CustomerInfoMenu,
    CustomerNotes,
    CustomerToggleActive,
    DeleteCustomer,
    DeleteInvoice,
    DiscountForm,
    GroupTypeBuilder,
    InvoiceOptions,
    SelectFeatures,
    SelectRooms,
    SelectTrim,
    SelectWindowOptions,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

// export default homeStack
export default createAppContainer(RootStack)

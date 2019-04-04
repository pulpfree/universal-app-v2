import React from 'react'
// import PropTypes from 'prop-types'
import { View } from 'react-native'

import { PaymentInfo } from '../components/PaymentInfo'
import { PaymentForm } from '../components/PaymentForm'

export default function Payments() {
  return (
    <View>
      <PaymentInfo />
      <PaymentForm />
    </View>
  )
}

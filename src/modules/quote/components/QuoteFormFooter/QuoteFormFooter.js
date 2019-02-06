import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
} from 'react-native'

import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'

const TotalRow = ({
  isDiscount, isTotal, label, value,
}) => (
  <View style={styles.row}>
    <Text style={[styles.label, isTotal ? styles.total : '', isDiscount ? styles.strikeThrough : '']}>{label}</Text>
    <Text style={[styles.totalsVal, isTotal ? styles.total : '', isDiscount ? styles.strikeThrough : '']}>{fmtMoney(value, 2, true)}</Text>
  </View>
)
TotalRow.propTypes = {
  isDiscount: PropTypes.bool,
  isTotal: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}
TotalRow.defaultProps = {
  isDiscount: false,
  isTotal: false,
}
const QuoteFormFooter = ({ discount, quotePrice }) => {
  const totals = {
    discountTotal: 0.00,
    subTotal: 0.00,
    tax: 0.00,
    total: 0.00,
  }

  const haveDiscount = !!discount.total

  if (haveDiscount) {
    totals.discountTotal = discount.total + discount.discount
    totals.subTotal = discount.subtotal
    totals.tax = discount.tax
    totals.total = discount.total
  } else {
    totals.subTotal = quotePrice.subtotal
    totals.tax = quotePrice.tax
    totals.total = quotePrice.total
  }

  return (
    <View style={styles.container}>
      {haveDiscount && <TotalRow label="Total" value={totals.discountTotal} isDiscount />}
      <TotalRow label="Subtotal" value={totals.subTotal} />
      <TotalRow label="Tax" value={totals.tax} />
      <TotalRow label="Total" value={totals.total} isTotal />
    </View>
  )
}
QuoteFormFooter.propTypes = {
  discount: PropTypes.instanceOf(Object).isRequired,
  quotePrice: PropTypes.instanceOf(Object).isRequired,
}

export default QuoteFormFooter

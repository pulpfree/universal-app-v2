import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'

const TotalRow = ({
  isDiscount, isTotal, label, isLinked, value,
}) => {
  const labelStyles = [styles.label]
  const valueStyles = [styles.totalsVal]
  if (isTotal) {
    labelStyles.push(styles.total)
    valueStyles.push(styles.total)
  }
  if (isDiscount) {
    labelStyles.push(styles.strikeThrough)
    valueStyles.push(styles.strikeThrough)
  }
  if (isLinked) {
    labelStyles.push(styles.linked)
  }

  return (
    <View style={styles.row}>
      <Text style={labelStyles}>{label}</Text>
      <Text style={valueStyles}>{fmtMoney(value, 2, true)}</Text>
    </View>
  )
}
TotalRow.propTypes = {
  isDiscount: PropTypes.bool,
  isLinked: PropTypes.bool,
  isTotal: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}
TotalRow.defaultProps = {
  isDiscount: false,
  isLinked: false,
  isTotal: false,
}
const QuoteFormFooter = ({ discount, navigation, quote }) => {
  const { quotePrice, itemCosts } = quote
  const totals = {
    discountTotal: 0.00,
    subTotal: 0.00,
    tax: 0.00,
    total: 0.00,
  }
  const haveDiscount = !!discount.total

  if (haveDiscount) {
    totals.discountTotal = itemCosts.subtotal
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
      {discount.description !== '' && <Text>{discount.description}</Text>}
      {haveDiscount && <TotalRow label="Total" value={totals.discountTotal} isDiscount />}
      <TouchableOpacity onPress={() => navigation.navigate('DiscountForm', { quote })}>
        <TotalRow label="Subtotal" isLinked value={totals.subTotal} />
      </TouchableOpacity>
      <TotalRow label="Tax" value={totals.tax} />
      <TotalRow label="Total" value={totals.total} isTotal />
    </View>
  )
}
QuoteFormFooter.propTypes = {
  discount: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  quote: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(QuoteFormFooter)

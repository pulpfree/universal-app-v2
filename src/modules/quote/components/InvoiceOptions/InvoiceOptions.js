import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { ModalHeader } from '../../../common/components/ModalHeader'
import styles from './styles'
import { pdfPreviewArgs } from '../../utils'

function InvoiceOptions({ navigation }) {
  const quote = navigation.getParam('quote')
  // console.log('quote in InvoiceOptions:', quote)
  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Invoice Options" />

        <View style={styles.body}>
          <TouchableOpacity onPress={() => {
            // navigation.goBack()
            navigation.navigate('QuotePreview', { previewArgs: pdfPreviewArgs(quote) })
          }}
          >
            <View style={styles.optRow}>
              <Text style={styles.optText}>PDF Preview</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Payments')}>
            <View style={styles.optRow}>
              <Text style={styles.optText}>Record Payments</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DiscountForm', { quotePrice: quote.quotePrice })}>
            <View style={styles.optRow}>
              <Text style={styles.optText}>Adjust Discount</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DeleteInvoice')}>
            <View style={styles.optRow}>
              <Text style={styles.optText}>Delete Invoice</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}
InvoiceOptions.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(InvoiceOptions)

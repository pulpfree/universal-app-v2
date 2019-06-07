import React from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { ModalHeader } from '../../../common/components/ModalHeader'
import styles from './styles'
import { pdfPreviewArgs, workSheetArgs } from '../../utils'

function InvoiceOptions({ navigation }) {
  const quote = navigation.getParam('quote')
  const customerID = navigation.getParam('customerID')

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Invoice Options" />

        <View style={styles.body}>
          <TouchableOpacity onPress={() => navigation.navigate('QuotePreview', { previewArgs: pdfPreviewArgs(quote), customerID })}>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>PDF Preview</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('CustomerInfo', { customerID })}>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Customer Details</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DiscountForm', { quote, customerID })}>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Adjust Discount</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('WorkSheet', { fileArgs: workSheetArgs(quote) })}>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>View Worksheet</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Payments', { quote, customerID })}>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>View/Record Payments</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('DeleteInvoice', { quote, customerID })}>
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Delete Invoice</Text>
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

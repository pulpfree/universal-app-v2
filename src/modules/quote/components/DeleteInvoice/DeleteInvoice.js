import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'

import { Button } from 'react-native-elements'

import { ModalHeader } from '../../../common/components/ModalHeader'
import styles from './styles'

function DeleteInvoice({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Delete Invoice" />

        <View style={styles.infoCont}>
          <View style={styles.infoCell}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Customer</Text>
              <Text style={styles.infoValue}>James ONeil</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>24 Aquaduct St, Welland</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>Mon. Apr. 1st, 2019</Text>
            </View>
          </View>

          <View style={styles.infoCell}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Invoice</Text>
              <Text style={styles.infoValue}>1387</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Total Cost</Text>
              <Text style={styles.infoValue}>5,500.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.formCont}>
          <Text style={styles.warnText}>Are you certain you want to delete this invoice?</Text>
          <View style={styles.buttonRow}>
            <Button
              // disabled={loading}
              // onPress={() => _handleRemove(jobSheetRemove, jobSheet._id)}
              title="Yes Delete Invoice"
              type="solid"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />

            <Button
              // disabled={loading}
              onPress={() => navigation.goBack()}
              title="Cancel"
              type="solid"
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
          </View>
        </View>

      </View>
    </View>
  )
}
DeleteInvoice.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(DeleteInvoice)

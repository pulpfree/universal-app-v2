import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { withNavigation } from 'react-navigation'

import { ModalHeader } from '../../../common/components/ModalHeader'
import styles from './styles'

function CustomerInfoMenu({ navigation }) {
  const customer = navigation.getParam('customer')

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Customer Options" />

        <View style={styles.body}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('CustomerProfile', { customer })
          }}
          >
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Customer Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('CustomerNotes', { customer })
          }}
          >
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Customer Notes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('CustomerToggleActive', { customer })
          }}
          >
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>{customer.active ? 'Deactivate' : 'Activate'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            navigation.navigate('DeleteCustomer', { customer })
          }}
          >
            <View style={styles.menuRow}>
              <Text style={styles.menuText}>Delete Customer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
CustomerInfoMenu.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(CustomerInfoMenu)

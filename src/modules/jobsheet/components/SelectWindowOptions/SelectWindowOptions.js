import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import clr from '../../../../config/colors'
import styles from './styles'
import { WindowOptions } from '../../config/jobSheetConstants'

function SelectWindowOptions({ navigation }) {
  const [options, setOption] = useState([])

  const addOption = (opt) => {
    if (options.find(option => option === opt)) return false
    setOption([
      ...options,
      opt,
    ])
    return true
  }

  const clearOptions = () => {
    setOption([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={{ width: 30 }} />
          <Text style={styles.headerText}>Select Window Options</Text>
          <Icon
            name="close"
            onPress={() => navigation.goBack()}
            size={30}
            color={clr.white}
            containerStyle={styles.iconCont}
          />
        </View>

        <View style={styles.formCont}>
          <View style={styles.optCont}>
            <View style={styles.optList}>
              {WindowOptions.map(opt => (
                <View style={styles.optRow} key={opt}>
                  <TouchableOpacity onPress={() => addOption(opt)}>
                    <Text style={styles.optOption} allowFontScaling={false}>{opt}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.inputCell}>
              <TextInput
                multiline
                style={[styles.optInput, { height: 150, lineHeight: 22 }]}
                value={options.join('\n')}
              />
              <TextInput
                keyboardType="numeric"
                style={styles.optInput}
                placeholder="Enter cost"
              />
              <View style={styles.buttonRow}>
                <Button
                  disabled={!options.length}
                  onPress={clearOptions}
                  title="Clear"
                  buttonStyle={styles.submitButtonSecondary}
                  style={{ width: 130 }}
                  icon={{
                    name: 'ios-close-circle-outline',
                    type: 'ionicon',
                    color: 'white',
                  }}
                />
                <Button
                  disabled={!options.length}
                  // onPress={clearOptions}
                  title="Save"
                  buttonStyle={styles.submitButton}
                  style={{ width: 130, marginLeft: 20 }}
                  icon={{
                    name: 'ios-send',
                    type: 'ionicon',
                    color: 'white',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
SelectWindowOptions.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(SelectWindowOptions)

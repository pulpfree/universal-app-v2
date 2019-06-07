import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button, Icon } from 'react-native-elements'
import { Mutation } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import clr from '../../../../config/colors'
import styles from './styles'
import { SET_FIELD, SET_GROUP_FIELD } from '../../mutations/local'
import { TrimOptions } from '../../config/jobSheetConstants'

function SelectTrim({ navigation }) {
  const trm = navigation.getParam('trim', '')
  const type = navigation.getParam('type')
  const tmpTrim = trm && trm.length > 0 ? trm.trim().split('\n') : []
  const [options, setOption] = useState(tmpTrim)

  const cst = navigation.getParam('cost', 0.00)
  const [cost, setCost] = useState(cst)

  const [customFeature, setCustomFeature] = useState(null)

  const addOption = (opt) => {
    if (options.find(option => option === opt)) return false
    setOption([
      ...options,
      opt,
    ])
    setCustomFeature(null)
    return true
  }

  const clearOptions = () => {
    setOption([])
    setCost('')
  }

  let mutation
  switch (type) {
    case 'group':
      mutation = SET_GROUP_FIELD
      break
    case 'window':
      mutation = SET_FIELD
      break
    default:
      return false
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={{ width: 30 }} />
          <Text style={styles.headerText}>Select Trim</Text>
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
              {TrimOptions.map(opt => (
                <View style={styles.optRow} key={opt}>
                  <TouchableOpacity onPress={() => addOption(opt)}>
                    <Text style={styles.optOption} allowFontScaling={false}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.inputCell}>
              <TextInput
                onChangeText={text => setCustomFeature(text)}
                onEndEditing={() => addOption(customFeature)}
                placeholder="Enter custom feature"
                style={styles.optInput}
                value={customFeature}
              />
              <TextInput
                editable={false}
                multiline
                onChangeText={text => setOption(text)}
                style={[styles.optInput, { height: 190, lineHeight: 22 }]}
                value={options.join('\n')}
              />
              <TextInput
                keyboardType="numeric"
                onChangeText={text => setCost(text)}
                placeholder="Enter cost"
                selectTextOnFocus
                style={styles.optInput}
                value={cost.toString()}
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
                <Mutation mutation={mutation}>
                  {setField => (
                    <Button
                      disabled={!options.length}
                      onPress={() => {
                        setField({ variables: { field: 'specs.trim', value: options.join('\n') } })
                        setField({ variables: { field: 'costs.trim', value: cost } })
                        navigation.goBack()
                      }}
                      title="Save"
                      buttonStyle={styles.submitButton}
                      style={{ width: 130, marginLeft: 20 }}
                      icon={{
                        name: 'ios-send',
                        type: 'ionicon',
                        color: 'white',
                      }}
                    />
                  )}
                </Mutation>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
SelectTrim.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(SelectTrim)

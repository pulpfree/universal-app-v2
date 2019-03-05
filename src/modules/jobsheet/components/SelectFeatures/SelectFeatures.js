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
import { JobFeatures } from '../../config/jobSheetConstants'

function SelectFeatures({ navigation }) {
  const [features, setFeatures] = useState([])
  const [customFeature, setCustomFeature] = useState(null)

  const addFeature = (feat) => {
    if (features.find(feature => feature === feat)) return false
    setFeatures([
      ...features,
      feat,
    ])
    setCustomFeature(null)
    return true
  }

  const clearFeatures = () => {
    setFeatures([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={{ width: 30 }} />
          <Text style={styles.headerText}>Select Job Features</Text>
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
              {JobFeatures.map(opt => (
                <View style={styles.optRow} key={opt}>
                  <TouchableOpacity onPress={() => addFeature(opt)}>
                    <Text style={styles.optOption} allowFontScaling={false}>{opt}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.inputCell}>
              <TextInput
                onChangeText={text => setCustomFeature(text)}
                placeholder="Enter custom feature"
                onEndEditing={() => addFeature(customFeature)}
                style={styles.optInput}
                value={customFeature}
              />
              <TextInput
                multiline
                style={[styles.optInput, { height: 270, lineHeight: 22 }]}
                value={features.join('\n')}
              />
              <View style={styles.buttonRow}>
                <Button
                  disabled={!features.length}
                  onPress={clearFeatures}
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
                  disabled={!features.length}
                  // onPress={this._handleSubmit}
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
SelectFeatures.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(SelectFeatures)

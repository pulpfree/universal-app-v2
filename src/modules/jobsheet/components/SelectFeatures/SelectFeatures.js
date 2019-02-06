import React, { useState } from 'react'

import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Button, Icon } from 'react-native-elements'

import styles from './styles'

import clr from '../../../../config/colors'
import { JobFeatures } from '../../config/jobSheetConstants'

export default function SelectFeatures() {
  const [showModal, setModal] = useState(true)
  return (
    <View>
      <Modal
        animationType="fade"
        transparent
        visible={showModal}
      >
        <View style={styles.container}>
          <View style={styles.modalBox}>
            <View style={styles.header}>
              <Text style={{ width: 30 }} />
              <Text style={styles.headerText}>Select Job Features</Text>
              <Icon
                name="close"
                onPress={() => setModal(false)}
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
                      <TouchableOpacity onPress={() => this._onRoomPress(opt)}>
                        <Text style={styles.optOption} allowFontScaling={false}>{opt}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                <View style={styles.inputCell}>
                  <TextInput style={[styles.optInput, { height: 330 }]} />
                  <View style={styles.buttonRow}>
                    <Button
                      // disabled={!dirty || isSubmitting}
                      // onPress={this._handleSubmit}
                      // ref={(input) => { this.submit = input }}
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
                      // disabled={!dirty || isSubmitting}
                      // onPress={this._handleSubmit}
                      // ref={(input) => { this.submit = input }}
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
      </Modal>
    </View>
  )
}

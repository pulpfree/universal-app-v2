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
import { ADD_ROOMS } from '../../mutations/local'
import { Rooms } from '../../config/jobSheetConstants'


function SelectRooms({ navigation }) {
  const rms = navigation.getParam('rooms', [])
  const [rooms, setRooms] = useState(rms)

  const addRoom = (rm) => {
    if (rooms.find(room => room === rm)) return false
    setRooms([
      ...rooms,
      rm,
    ])
    return true
  }

  const clearRooms = () => {
    setRooms([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={{ width: 30 }} />
          <Text style={styles.headerText}>Select Rooms</Text>
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
              {Rooms.map(rm => (
                <View style={styles.optRow} key={rm.id}>
                  <TouchableOpacity onPress={() => addRoom(rm.id)}>
                    <Text style={styles.optOption} allowFontScaling={false}>
                      {rm.id}
                      &nbsp;-&nbsp;
                      {`[${rm.label}]`}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <View style={styles.inputCell}>
              <TextInput style={styles.optInput} value={rooms.join(', ')} />
              <View style={styles.buttonRow}>
                <Button
                  buttonStyle={styles.submitButtonSecondary}
                  disabled={!rooms.length}
                  onPress={clearRooms}
                  style={{ width: 130 }}
                  title="Clear"
                  icon={{
                    name: 'ios-close-circle-outline',
                    type: 'ionicon',
                    color: 'white',
                  }}
                />

                <Mutation mutation={ADD_ROOMS}>
                  {addWindowRooms => (
                    <Button
                      buttonStyle={styles.submitButton}
                      disabled={!rooms.length}
                      onPress={() => {
                        addWindowRooms({ variables: { rooms } })
                        navigation.goBack()
                      }}
                      style={{ width: 130, marginLeft: 20 }}
                      title="Save"
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
SelectRooms.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(SelectRooms)

import React, { useState } from 'react'

import {
  Text,
  Switch,
  View,
} from 'react-native'

import { CheckBox, SearchBar } from 'react-native-elements'

import clr from '../../../../config/colors'
import styles from './styles'

export default function CustomerSearchHeader() {
  const [isActive, setActive] = useState(true)
  const [lastName, setLastName] = useState(true)
  const [streetName, setStreetName] = useState(false)

  const _setName = (id) => {
    if (id === 'lastName') {
      setLastName(!lastName)
      setStreetName(false)
    } else if (id === 'streetName') {
      setLastName(false)
      setStreetName(!streetName)
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar
        // inputStyle={styles.input}
        // onChangeText={someMethod}
        // onClear={someMethod}
        autoCorrect={false}
        containerStyle={styles.searchContainer}
        lightTheme
        placeholder="Search Customer"
      />
      <CheckBox
        checked={lastName}
        checkedColor={clr.black}
        checkedIcon="dot-circle-o"
        containerStyle={styles.checkbox}
        onPress={() => _setName('lastName')}
        title="Last Name"
        uncheckedIcon="circle-o"
      />
      <CheckBox
        checked={streetName}
        checkedColor={clr.black}
        checkedIcon="dot-circle-o"
        containerStyle={styles.checkbox}
        onPress={() => _setName('streetName')}
        title="Street Name"
        uncheckedIcon="circle-o"
      />
      <View style={styles.switch}>
        <Text style={styles.switchLabel}>Active</Text>
        <Switch
          onValueChange={() => setActive(!isActive)}
          thumbColor={clr.black}
          trackColor={{ false: clr.mdGray, true: clr.mdGray }}
          value={isActive}
        />
      </View>
    </View>
  )
}

import React, { useState } from 'react'
import {
  Text,
  Switch,
  View,
} from 'react-native'

import { CheckBox, SearchBar } from 'react-native-elements'

import { SearchConsumer } from '../SearchContext'
import clr from '../../../../config/colors'
import styles from './styles'


export default function CustomerSearchHeader() {
  const [sVal, setSVal] = useState('')

  return (
    <SearchConsumer>
      {({
        isActive,
        setActive,
        lastName,
        streetName,
        setSearchVal,
        setStreetName,
        setLastName,
      }) => (
        <View style={styles.container}>
          <SearchBar
            autoFocus
            inputStyle={styles.input}
            onChangeText={
              (val) => {
                setSVal(val)
                setSearchVal(val)
              }
            }
            autoCorrect={false}
            containerStyle={styles.searchContainer}
            lightTheme
            placeholder="Search Customer"
            value={sVal}
          />
          <CheckBox
            checked={lastName}
            checkedColor={clr.black}
            checkedIcon="dot-circle-o"
            containerStyle={styles.checkbox}
            onPress={() => setLastName(!lastName)}
            title="Last Name"
            uncheckedIcon="circle-o"
          />
          <CheckBox
            checked={streetName}
            checkedColor={clr.black}
            checkedIcon="dot-circle-o"
            containerStyle={styles.checkbox}
            onPress={() => setStreetName(!streetName)}
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
      )}
    </SearchConsumer>
  )
}

import React from 'react'
import {
  Button,
  Switch,
  Text,
  View,
} from 'react-native'

import clr from '../../config/colors'

export default function QuoteSearchHeader() {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 12,
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        // backgroundColor: 'blue',
      }}
    >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Switch
          // onValueChange={value => this._onInvoicedChecked(value)}
          thumbColor={clr.black}
          trackColor={{ false: clr.mdGray, true: clr.mdGray }}
          // value={this.state.searchInvoiced}
          value={true}
        />
        <Text>Invoiced</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Switch
          // onValueChange={value => this._onInvoicedChecked(value)}
          thumbColor={clr.black}
          trackColor={{ false: clr.mdGray, true: clr.mdGray }}
          // value={this.state.searchInvoiced}
        />
        <Text>Outstanding</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          // onPress={onPressLearnMore}
          title="Search"
          color={clr.black}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <View style={{ flex: 1 }}>
        <Switch
          // onValueChange={value => this._onInvoicedChecked(value)}
          thumbColor={clr.primary}
          trackColor={{ false: clr.mdGray, true: clr.mdGray }}
        // ios_backgroundColor="#E7E7E7"
          // value={true}
        // value={this.state.searchInvoiced}
        />
        <Text>header</Text>
      </View>
    </View>
  )
}

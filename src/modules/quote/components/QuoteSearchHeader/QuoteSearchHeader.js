import React, { useState } from 'react'
import {
  Picker,
  Switch,
  Text,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import clr from '../../../../config/colors'
import styles from './styles'
import { fmtMoney } from '../../../../util/fmt'

function Totals() {
  return (
    <View style={styles.costContainer}>
      <View style={styles.costCell}>
        <Text style={styles.costLabel}>Total Costs</Text>
        <Text style={styles.costValue}>{fmtMoney(1096001, 0, true, true)}</Text>
      </View>
      <View style={styles.costCell}>
        <Text style={styles.costLabel}>Total Outstanding</Text>
        <Text style={styles.costValue}>{fmtMoney(108100, 0, true, true)}</Text>
      </View>
    </View>
  )
}

function periods() {
  const ps = []
  const year = new Date().getFullYear()
  ps.push(String(year))
  ps.push(String(year - 1))
  ps.push(String(year - 2))
  return ps
}

export default function QuoteSearchHeader() {
  const [invoiced, setInvoiced] = useState(true)
  const [outstanding, setOutstanding] = useState(true)
  const [period, setPeriod] = useState('recent')
  const [showTotals, setShowTotals] = useState(true)

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>
            Period
          </Text>
          <Picker
            selectedValue={period}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={value => setPeriod(value)}
          >
            <Picker.Item label="Recent" value="recent" />
            {periods().map(p => (
              <Picker.Item key={p} label={p} value={p} />
            ))}
          </Picker>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Invoiced</Text>
          <Switch
            onValueChange={() => setInvoiced(!invoiced)}
            thumbColor={clr.black}
            trackColor={{ false: clr.mdGray, true: clr.mdGray }}
            value={invoiced}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Outstanding</Text>
          <Switch
            onValueChange={() => setOutstanding(!outstanding)}
            thumbColor={clr.black}
            trackColor={{ false: clr.mdGray, true: clr.mdGray }}
            value={outstanding}
          />
        </View>
        <View style={styles.cell}>
          <Button
            // onPress={onPressLearnMore}
            title="Search"
            buttonStyle={{
              backgroundColor: clr.primary,
            }}
            style={styles.button}
            icon={(
              <Icon
                name="search"
                color={clr.white}
              />
            )}
          />
        </View>
      </View>
      {showTotals && <Totals />}
    </View>
  )
}

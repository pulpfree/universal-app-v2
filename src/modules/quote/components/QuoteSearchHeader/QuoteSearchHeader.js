import React from 'react'
import {
  Picker,
  Switch,
  Text,
  View,
} from 'react-native'

import { SearchConsumer } from '../SearchContext'
import clr from '../../../../config/colors'
import styles from './styles'

function periods() {
  const ps = []
  const year = new Date().getFullYear()
  ps.push(String(year))
  ps.push(String(year - 1))
  ps.push(String(year - 2))
  return ps
}

export default function QuoteSearchHeader() {
  return (
    <SearchConsumer>
      {({
        closed,
        setClosed,
        invoiced,
        setInvoiced,
        period,
        setPeriod,
      }) => (
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
                <Picker.Item label="Recent" value="" />
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
              <Text style={styles.cellLabel}>Closed</Text>
              <Switch
                disabled={!invoiced}
                onValueChange={() => setClosed(!closed)}
                thumbColor={clr.black}
                trackColor={{ false: clr.mdGray, true: clr.mdGray }}
                value={closed}
              />
            </View>
          </View>
        </View>
      )}
    </SearchConsumer>
  )
}

import React, { useRef, useState } from 'react'
// import PropTypes from 'prop-types'
import {
  Picker,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
// import { withNavigation } from 'react-navigation'
import { Button } from 'react-native-elements'

import styles from './styles'
import { GroupTypeParts, Qty } from '../../config/jobSheetConstants'
import { ModalHeader } from '../../../common/components/ModalHeader'

function GroupTypeBuilder() {
  const [qty, setQty] = useState(0)
  const [groupText, setGroupText] = useState('')
  const groupTypeInput = useRef('')

  const setGroupTypeQty = (val) => {
    setQty(val)
    if (!val) return
    // const curVal = groupText.length > 0 ? `${groupText} ${val.toString()} ` : val.toString()
    const curVal = `${groupText}${val.toString()} `
    setGroupText(curVal)
    groupTypeInput.current.focus()
    setQty(0)
  }

  const setGroupTypePart = (val) => {
    // const curVal = groupText.length > 0 ? `${groupText} ${val}` : val
    const curVal = `${groupText}${val} `
    setGroupText(curVal)
    groupTypeInput.current.focus()
  }

  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <ModalHeader title="Group Type" />

        <View style={styles.body}>

          <View style={styles.col}>

            <View style={styles.formCell}>
              <Text style={styles.cellLabel}>Qty</Text>
              <Picker
                selectedValue={qty}
                style={styles.pickerSm}
                itemStyle={styles.pickerItemSm}
                onValueChange={value => setGroupTypeQty(value)}
              >
                <Picker.Item label="0" value={0} />
                {Qty.map(n => (
                  <Picker.Item
                    key={n}
                    label={n.toString()}
                    value={n}
                  />
                ))}
              </Picker>

              <View style={{ paddingTop: 20 }}>
                <Text>separator</Text>
                <TouchableOpacity onPress={() => setGroupTypePart('-')}>
                  <Text style={styles.commaLabel}>( - )</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <View style={styles.col}>
            <Text style={styles.cellLabel}>Part</Text>
            <View style={styles.optList}>
              {GroupTypeParts.map(part => (
                <View style={styles.optRow} key={part}>
                  <TouchableOpacity onPress={() => setGroupTypePart(part)}>
                    <Text style={styles.optOption} allowFontScaling={false}>{part}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.col}>
            <Text style={styles.cellLabel}>{' '}</Text>
            <TextInput
              onChangeText={text => setGroupText(text)}
              placeholder="Group Type"
              ref={groupTypeInput}
              // onEndEditing={() => addFeature(customFeature)}
              style={styles.optInput}
              value={groupText}
            />

            <View style={styles.buttonRow}>
              <Button
                // disabled={!features.length}
                onPress={() => setGroupText('')}
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
                // disabled={!features.length || loading}
                // onPress={() => jobSheetPersistFeatures({
                  // variables: { id: jobSheet._id, features: features.join('\n') },
                // })}
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
  )
}

export default GroupTypeBuilder

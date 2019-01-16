import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'

import clr from '../../../../config/colors'
import styles from './styles'
import { Header } from '../../../common/components/Header'

export default function JobSheetExisting() {
  return (
    <React.Fragment>
      <Header label="Create From Current" padTop={false} />
      <View style={styles.addressContainer}>
        <Text style={styles.addressCell}>Test Dummy</Text>
        <Text style={styles.addressCell}>123 Street Ave., Somecity, ON</Text>
        <Text style={styles.addressCell}>A1B 2C3</Text>
        <Button
          // onPress={this._handleSubmit}
          // ref={(input) => { this.submit = input }}
          title="Create"
          buttonStyle={{
            backgroundColor: clr.primary,
          }}
          style={{ width: 200 }}
          icon={(
            <Icon
              name="done"
              color={clr.white}
            />
          )}
        />
      </View>
    </React.Fragment>
  )
}

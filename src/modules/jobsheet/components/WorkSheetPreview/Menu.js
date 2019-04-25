import React from 'react'
// import PropTypes from 'prop-types'
import { View } from 'react-native'

import { Button } from 'react-native-elements'

import { styles } from './index'
// import { Error } from '../../../common/components/Error'

export default function Menu() {
  return (
    <View style={styles.menuCont}>
      <Button
        buttonStyle={styles.button}
        // disabled={!filePath || loading || !customer.email}
        // onPress={() => handleEmail(customer, file)}
        title="Email PDF"
        titleStyle={styles.buttonCont}
      />
      <Button
        buttonStyle={styles.button}
        // disabled={!filePath || loading || !getMobilePhone(customer.phones)}
        // onPress={() => handleSMS(customer, file, signedURL)}
        title="Message PDF"
        titleStyle={styles.buttonCont}
      />
      {/*error && <Error error={error} />*/}
    </View>
  )
}

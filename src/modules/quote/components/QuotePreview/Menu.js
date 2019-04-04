import React from 'react'
import PropTypes from 'prop-types'
import { Alert, View } from 'react-native'

import Mailer from 'react-native-mail'
import { Button } from 'react-native-elements'
import { Query } from 'react-apollo'

import { CUSTOMER } from '../../../customer/queries'

import { Error } from '../../../common/components/Error'
import { capitalize } from '../../../../util/fmt'
import { styles } from './index'


const handleEmail = (customer, file) => {
  const customerName = `${customer.name.first} ${customer.name.last}`
  const type = capitalize(file.type)
  const no = file.type === 'quote' ? `${file.number}-${file.version}` : `${file.number}`
  const fileNm = file.type === 'quote' ? `qte-${file.number}-${file.version}.pdf` : `inv-${file.number}`
  const body = `
  Hello ${customerName},<br><br>
  Please find attached your ${file.type}: #${no}<br>
  We look forward to discussing any questions you may have.<br>
  Regards,<br>
  Universal Windows
  `
  const params = {
    subject: `Universal Windows ${type} ${no} (contains attachment)`,
    recipients: [customer.email],
    body,
    isHTML: true,
    attachment: {
      path: file.path,
      type: 'pdf',
      name: fileNm,
    },
  }

  Mailer.mail(params, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        { text: 'Ok' },
        // { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
      ],
      { cancelable: false }
    )
  })
}

export default function Menu({ customerID, fileArgs, filePath }) {
  const file = { ...fileArgs }
  if (filePath) {
    file.path = filePath
  }

  return (
    <Query
      query={CUSTOMER}
      variables={{ customerID }}
    >
      {({ loading, error, data: customerData }) => {
        const { customer } = customerData

        return (
          <View style={styles.menuCont}>
            <Button
              buttonStyle={styles.button}
              disabled={!filePath || loading}
              onPress={() => handleEmail(customer, file)}
              title="Email PDF"
              titleStyle={styles.buttonCont}
            />
            <Button
              buttonStyle={styles.button}
              disabled={!filePath || loading}
              // onPress={() => saveFile()}
              title="Save PDF"
              titleStyle={styles.buttonCont}
            />
            {error && <Error error={error} />}
          </View>
        )
      }}
    </Query>
  )
}
Menu.propTypes = {
  customerID: PropTypes.string.isRequired,
  fileArgs: PropTypes.instanceOf(Object).isRequired,
  filePath: PropTypes.string.isRequired,
}

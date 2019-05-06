import React from 'react'
import PropTypes from 'prop-types'
import { Alert, View } from 'react-native'

import Mailer from 'react-native-mail'
import SendSMS from 'react-native-sms'
import { Button } from 'react-native-elements'
import { Query } from 'react-apollo'

import { CUSTOMER } from '../../../customer/queries'

import { Error } from '../../../common/components/Error'
import { capitalize } from '../../../../util/fmt'
import { getMobilePhone, stripPhoneDigits } from '../../../../util/utils'
import { styles } from './index'
import { AdminEmail } from '../../../../config/constants'

const setFileParams = file => (
  {
    type: capitalize(file.type),
    number: file.type === 'quote' ? `${file.number}-${file.version}` : `${file.number}`,
    fileNm: file.type === 'quote' ? `qte-${file.number}-${file.version}.pdf` : `inv-${file.number}`,
  }
)

const handleEmail = (customer, file) => {
  const customerName = `${customer.name.first} ${customer.name.last}`
  const fileParams = setFileParams(file)
  const body = `
  Hello ${customerName},<br><br>
  Please find attached your ${fileParams.type}: #${fileParams.number}<br>
  We look forward to discussing any questions you may have.<br>
  Regards,<br>
  Universal Windows
  `
  const params = {
    subject: `Universal Windows ${fileParams.type} ${fileParams.number} (contains attachment)`,
    recipients: [customer.email],
    body,
    isHTML: true,
    attachment: {
      path: file.path,
      type: 'pdf',
      name: fileParams.fileNm,
    },
  }

  Mailer.mail(params, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        { text: 'Ok' },
      ],
      { cancelable: false }
    )
  })
}

const handleAdminEmail = (customer, file) => {
  const customerName = `${customer.name.first} ${customer.name.last}`
  const fileParams = setFileParams(file)
  const body = `
  Hello Administrator,<br><br>
  Please find attached a copy of the ${fileParams.type}: #${fileParams.number} for customer: ${customerName}<br>
  Regards,<br>
  Universal Windows
  `
  const params = {
    subject: `Universal Windows ${fileParams.type} ${fileParams.number} (contains attachment)`,
    recipients: [AdminEmail],
    body,
    isHTML: true,
    attachment: {
      path: file.path,
      type: 'pdf',
      name: fileParams.fileNm,
    },
  }

  Mailer.mail(params, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        { text: 'Ok' },
      ],
      { cancelable: false }
    )
  })
}

const handleSMS = (customer, file, signedURL) => {
  let phone = getMobilePhone(customer.phones)
  if (!phone) return false
  phone = stripPhoneDigits(phone)

  const customerName = `${customer.name.first} ${customer.name.last}`
  const fileParams = setFileParams(file)
  const body = `Hello ${customerName}
Please find below a link to your ${fileParams.type}: #${fileParams.number}
We look forward to discussing any questions you may have.
Regards, Universal Windows ${signedURL}`

  SendSMS.send({
    body,
    recipients: [phone],
    successTypes: ['sent', 'queued'],
    // allowAndroidSendWithoutReadPermission: true
  }, (completed, cancelled, error) => {
    console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + ' error: ' + error) // eslint-disable-line
  })
  return true
}

const handleAdminSMS = (customer, file, signedURL) => {
  const customerName = `${customer.name.first} ${customer.name.last}`
  const fileParams = setFileParams(file)
  const body = `Hello Administrator,
Please find below a link to the ${fileParams.type}: #${fileParams.number} for customer ${customerName}.
Regards, Universal Windows ${signedURL}`

  SendSMS.send({
    body,
    recipients: [],
    successTypes: ['sent', 'queued'],
  }, (completed, cancelled, error) => {
    console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + ' error: ' + error) // eslint-disable-line
  })
  return true
}

export default function Menu({
  customerID,
  fileArgs,
  filePath,
  signedURL,
}) {
  const file = { ...fileArgs }
  if (filePath) {
    file.path = filePath
  }

  return (
    <Query
      query={CUSTOMER}
      variables={{ customerID }}
      fetchPolicy="network-only"
    >
      {({ loading, error, data: customerData }) => {
        const { customer } = customerData

        return (
          <View style={styles.menuCont}>
            <Button
              buttonStyle={styles.button}
              disabled={!filePath || loading || !customer.email}
              onPress={() => handleEmail(customer, file)}
              title="Email Customer"
              titleStyle={styles.buttonCont}
            />
            <Button
              buttonStyle={styles.button}
              disabled={!filePath || loading || !getMobilePhone(customer.phones)}
              onPress={() => handleSMS(customer, file, signedURL)}
              title="Message Customer"
              titleStyle={styles.buttonCont}
            />
            <Button
              buttonStyle={styles.buttonSecondary}
              disabled={!filePath || loading}
              onPress={() => handleAdminEmail(customer, file)}
              title="Email Admin"
              titleStyle={styles.buttonCont}
            />
            <Button
              buttonStyle={styles.buttonSecondary}
              disabled={!filePath || loading}
              onPress={() => handleAdminSMS(customer, file, signedURL)}
              title="Message Admin"
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
  signedURL: PropTypes.string.isRequired,
}

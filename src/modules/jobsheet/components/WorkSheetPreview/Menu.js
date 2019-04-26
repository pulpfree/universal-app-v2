import React from 'react'
import PropTypes from 'prop-types'
import { Alert, View } from 'react-native'

import Mailer from 'react-native-mail'
import { Button } from 'react-native-elements'
import SendSMS from 'react-native-sms'

import { styles } from './index'
import { AdminEmail } from '../../../../config/constants'
import { capitalize } from '../../../../util/fmt'

const setFileParams = file => (
  {
    type: capitalize(file.type),
    number: file.number,
    fileNm: `sht-${file.number}.pdf`,
  }
)

const handleAdminEmail = (file) => {
  const fileParams = setFileParams(file)
  const body = `
  Hello Administrator,<br><br>
  Please find attached a copy of the ${fileParams.type}: #${fileParams.number}<br>
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

const handleSMS = (file, signedURL) => {
  const fileParams = setFileParams(file)
  const body = `Hello Administrator,
Please find below a link to the ${fileParams.type}: #${fileParams.number}
Regards, Universal Windows ${signedURL}`

  SendSMS.send({
    body,
    recipients: [],
    successTypes: ['sent', 'queued'],
    // allowAndroidSendWithoutReadPermission: true
  }, (completed, cancelled, error) => {
    console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + ' error: ' + error) // eslint-disable-line
  })
  return true
}

export default function Menu({
  fileArgs,
  filePath,
  signedURL,
}) {
  const file = { ...fileArgs }
  if (filePath) {
    file.path = filePath
  }
  return (
    <View style={styles.menuCont}>
      <Button
        buttonStyle={styles.button}
        disabled={!filePath}
        onPress={() => handleAdminEmail(file)}
        title="Email PDF"
        titleStyle={styles.buttonCont}
      />
      <Button
        buttonStyle={styles.button}
        disabled={!filePath}
        onPress={() => handleSMS(file, signedURL)}
        title="Message PDF"
        titleStyle={styles.buttonCont}
      />
    </View>
  )
}
Menu.propTypes = {
  fileArgs: PropTypes.instanceOf(Object).isRequired,
  filePath: PropTypes.string.isRequired,
  signedURL: PropTypes.string.isRequired,
}

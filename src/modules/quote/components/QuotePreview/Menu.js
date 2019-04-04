import React from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  // Dimensions,
  // Text,
  View,
} from 'react-native'
// import RNFS from 'react-native-fs'

import { Button } from 'react-native-elements'
import Mailer from 'react-native-mail'
import { Query } from 'react-apollo'

import { CUSTOMER } from '../../../customer/queries'

import { filesApi, styles } from './index'
import { capitalize } from '../../../../util/fmt'


// const RNFS = require('react-native-fs')
const handleEmail = (fileArgs, attachPath) => {
  console.log('fileArgs:', fileArgs)

  const type = capitalize(fileArgs.type)
  const no = fileArgs.type === 'quote' ? `${fileArgs.number}/${fileArgs.version}` : `${fileArgs.number}`
  const fileNm = fileArgs.type === 'quote' ? `qte-${fileArgs.number}-${fileArgs.version}.pdf` : `inv-${fileArgs.number}`
  const body = `
  Hello (Customer name),<br><br>
  Attached in your ${fileArgs.type}: #${no}<br><br>
  Regards,<br>
  Universal Windows
  `
  const params = {
    subject: `Universal Windows ${type} ${no} (container attachment)`,
    recipients: ['rond@webbtech.net'],
    body,
    isHTML: true,
    attachment: {
      path: attachPath,
      type: 'pdf',
      name: fileNm,
    },
  }
  // fileArgs: {number: 9013, type: "quote", version: 1
  // Hello { {.CustomerName } }, <br><br>
  // Attached is your invoice: #{{.QuoteNo }}<br><br>
  // Regards,<br>
  // Universal Windows
  console.log('params:', params)
  Mailer.mail(params, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
        // { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
      ],
      // { cancelable: true }
    )
  })
  /* Mailer.mail({
    subject: 'need help',
    recipients: ['rond@webbtech.net'],
    // ccRecipients: ['supportCC@example.com'],
    // bccRecipients: ['supportBCC@example.com'],
    body: 'Please find attached your quote',
    isHTML: true,
    attachment: {
    //   path: '',  // The absolute path of the file from which to read data.
      path: attachPath,
      type: 'pdf',
      name: 'test.pdf',
    //   type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
    //   name: '',   // Optional: Custom filename for attachment
    },
  }, (error, event) => {
    Alert.alert(
      error,
      event,
      [
        { text: 'Ok', onPress: () => console.log('OK: Email Error Response') },
        // { text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response') }
      ],
      // { cancelable: true }
    )
  }) */
}

export default function Menu({ customerID, fileArgs, filePath }) {
  if (filePath) {
    const { data, isLoading, isError } = filesApi(fileArgs, filePath)
    // console.log('data from filesApi:', data)
  }
  // console.log('fileArgs in Menu:', fileArgs)
  // console.log('filePath in Menu:', filePath)
  /* console.log('RNFS.MainBundlePath:', RNFS.MainBundlePath)
  console.log('RNFS.DocumentDirectoryPath:', RNFS.DocumentDirectoryPath)
  console.log('RNFS.CachesDirectoryPath:', RNFS.CachesDirectoryPath)

  RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then((result) => {
      console.log('GOT RESULT', result)
      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path])
    }) */
    /* .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8')
      }
      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents
    })
    .catch((err) => {
      console.log(err.message, err.code);
    }) */

  return (
    <Query
      query={CUSTOMER}
      variables={{ customerID }}
    >
      {({ loading, error, data: customerData }) => {
        console.log('customerData in query: ', customerData)
        return (
          <View style={styles.menuCont}>
            <Button
              buttonStyle={styles.button}
              disabled={!filePath}
              onPress={() => handleEmail(fileArgs, filePath)}
              title="Email PDF"
              titleStyle={styles.buttonCont}
            />
            <Button
              buttonStyle={styles.button}
              disabled={!filePath}
              // onPress={() => saveFile()}
              title="Save PDF"
              titleStyle={styles.buttonCont}
            />
          </View>
        )
      }}
    </Query>
  )
}
Menu.propTypes = {
  fileArgs: PropTypes.instanceOf(Object).isRequired,
  filePath: PropTypes.string.isRequired,
}

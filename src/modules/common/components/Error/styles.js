import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    minHeight: 50,
  },
  text: {
    backgroundColor: clr.alert,
    fontSize: 18,
    padding: 10,
    lineHeight: 30,
  },
})

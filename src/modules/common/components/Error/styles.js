import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    backgroundColor: clr.alert,
    fontSize: 18,
    padding: 10,
    lineHeight: 30,
  },
})

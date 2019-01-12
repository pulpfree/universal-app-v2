import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  button: {
    width: 140,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  column: {
    // flex: 1,
    flexDirection: 'column',
  },
  row: {
    // flex: 1,
    flexDirection: 'row',
    // paddingTop: 4,
    paddingBottom: 8,
  },
  label: {
    // flex: 1,
    textAlign: 'right',
    paddingRight: 5,
    color: clr.dkGray,
    fontWeight: '600',
    // width: 80,
  },
  value: {
    // flex: 1,
  },
  spacer: {
    height: 7,
  },
})

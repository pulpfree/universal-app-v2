import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    // paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: clr.mdGray,
    borderBottomWidth: 1,
  },
  checkbox: {
    flex: 0.25,
    margin: 0,
  },
  icon: {
    color: clr.primary,
  },
  smCell: {
    flex: 0.25,
  },
  nameCell: {
    flex: 1,
  },
  moneyCell: {
    flex: 0.5,
    textAlign: 'right',
  },
})

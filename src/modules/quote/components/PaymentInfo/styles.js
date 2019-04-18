import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  bold: {
    color: clr.black,
    fontWeight: '600',
  },
  container: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 5,
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: clr.dkGray,
  },
  cell: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  right: {
    textAlign: 'right',
    width: 90,
  },
  label: {
    width: 120,
    color: clr.dkGray,
    fontWeight: '600',
  },
  value: {},
})

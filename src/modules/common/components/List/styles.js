import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  header: {
    backgroundColor: clr.mdGray,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 14,
    paddingRight: 14,
  },
  cell: {},
  cellText: {
    color: clr.black,
  },
  itemRow: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottomWidth: 1,
    borderBottomColor: clr.mdGray,
  },
  itemCell: {
    flex: 1,
  },
})

import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    padding: 8.5,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottomWidth: 1,
    borderBottomColor: clr.mdGray,
  },
  itemCell: {
    flex: 1,
  },
})
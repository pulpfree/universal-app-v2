import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  itemRow: {
    // alignItems: 'flex-start',
    // alignContent: 'space-between',
    justifyContent: 'flex-start',
    borderBottomColor: clr.mdGray,
    borderBottomWidth: 1.25,
    flexDirection: 'row',
    padding: 8.5,
    paddingLeft: 14,
    paddingRight: 14,
  },
  itemCell: {
    flex: 0.5,
  },
})

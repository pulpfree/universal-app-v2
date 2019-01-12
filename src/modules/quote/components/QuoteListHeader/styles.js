import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  header: {
    backgroundColor: clr.ltGray,
    borderBottomWidth: 1.25,
    borderColor: clr.mdGray,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 14,
    paddingRight: 14,
  },
  cell: {},
  cellText: {
    color: clr.dkGray,
  },
})

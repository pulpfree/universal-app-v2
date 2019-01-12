import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  header: {
    backgroundColor: clr.ltGray,
    borderBottomWidth: 1.25,
    borderColor: clr.mdGray,
    borderTopWidth: 1.25,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 14,
    paddingRight: 14,
  },
  cell: {
    flex: 1,
  },
  cellText: {
    color: clr.dkGray,
    fontWeight: '600',
  },
})

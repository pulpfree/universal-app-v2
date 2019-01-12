import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: clr.ltGray,
    padding: 5,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottomWidth: 1.25,
    borderColor: clr.mdGray,
  },
  cell: {
    flex: 1,
  },
  cellText: {
    color: clr.dkGray,
    fontWeight: '600',
  },
  right: {
    textAlign: 'right',
  },
})

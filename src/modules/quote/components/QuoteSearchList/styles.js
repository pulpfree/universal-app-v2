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
  costContainer: {
    borderBottomColor: clr.mdGray,
    borderBottomWidth: 0.75,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  costCell: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  costLabel: {
    paddingRight: 5,
    color: clr.dkGray,
    fontWeight: '600',
  },
  costValue: {
  },
})

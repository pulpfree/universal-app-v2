import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'
import { styles as listStyles } from '../../../common/components/List'

export default StyleSheet.create({
  itemRow: {
    ...StyleSheet.flatten(listStyles.itemRow),
  },
  itemCell: {
    ...StyleSheet.flatten(listStyles.itemCell),
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

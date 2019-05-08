import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'
import { styles as listStyles } from '../../../common/components/List'

export default StyleSheet.create({
  header: {
    backgroundColor: clr.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    color: clr.ltGray,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  itemRow: {
    ...StyleSheet.flatten(listStyles.itemRow),
  },
  itemCell: {
    ...StyleSheet.flatten(listStyles.itemCell),
  },
})

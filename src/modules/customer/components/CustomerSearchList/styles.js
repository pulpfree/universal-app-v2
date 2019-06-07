import { StyleSheet } from 'react-native'

// import clr from '../../../../config/colors'
import { styles as listStyles } from '../../../common/components/List'

export default StyleSheet.create({
  itemRow: {
    ...StyleSheet.flatten(listStyles.itemRow),
  },
  itemCell: {
    ...StyleSheet.flatten(listStyles.itemCell),
    flex: 0.5,
  },
  noResultsCont: {
    padding: 10,
  },
  noResultsText: {
    fontSize: 16,
  },
})

import { StyleSheet } from 'react-native'

import { styles as listStyles } from '../../../common/components/List'

export default StyleSheet.create({
  header: {
    ...StyleSheet.flatten(listStyles.header),
  },
  cell: {
    ...StyleSheet.flatten(listStyles.cell),
    flex: 1,
  },
  cellText: {
    ...StyleSheet.flatten(listStyles.cellText),
  },
  right: {
    textAlign: 'right',
  },
})

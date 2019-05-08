import { StyleSheet } from 'react-native'

import { styles as listStyles } from '../../../common/components/List'

export default StyleSheet.create({
  header: {
    ...StyleSheet.flatten(listStyles.header),
  },
  cell: {
    ...StyleSheet.flatten(listStyles.cell),
  },
  cellText: {
    ...StyleSheet.flatten(listStyles.cellText),
  },
})

import { StyleSheet } from 'react-native'

// import clr from '../../../../config/colors'
import { styles } from '../../../common/components/Modal'
import { styles as listStyles } from '../../../common/components/ListMenu'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 350,
    width: 400,
  },
  body: {
    ...StyleSheet.flatten(styles.body),
  },
  menuRow: {
    ...StyleSheet.flatten(listStyles.menuRow),
  },
  menuText: {
    ...StyleSheet.flatten(listStyles.menuText),
  },
})

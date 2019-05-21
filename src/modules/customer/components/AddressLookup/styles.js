import { StyleSheet } from 'react-native'

// import clr from '../../../../config/colors'
import { styles } from '../../../common/components/Modal'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 600,
    width: 400,
  },
  body: {
    ...StyleSheet.flatten(styles.body),
  },
})

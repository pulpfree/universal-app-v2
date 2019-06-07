import { StyleSheet } from 'react-native'

// import clr from '../../../../config/colors'
import { styles } from '../../../common/components/Modal'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 340,
    // width: 400,
  },
  body: {
    ...StyleSheet.flatten(styles.body),
  },
  button: {
    ...StyleSheet.flatten(styles.button),
  },
  buttonRow: {
    ...StyleSheet.flatten(styles.buttonRow),
  },
  buttonTitle: {
    ...StyleSheet.flatten(styles.buttonTitle),
  },
  formCont: {
    ...StyleSheet.flatten(styles.formCont),
  },
  infoCont: {
    ...StyleSheet.flatten(styles.infoCont),
  },
  infoCell: {
    ...StyleSheet.flatten(styles.infoCell),
  },
  infoRow: {
    ...StyleSheet.flatten(styles.infoRow),
  },
  infoLabel: {
    ...StyleSheet.flatten(styles.infoLabel),
  },
  infoValue: {},
  right: {
    ...StyleSheet.flatten(styles.right),
  },
  warnText: {
    ...StyleSheet.flatten(styles.warnText),
  },
})

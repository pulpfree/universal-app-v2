import { StyleSheet } from 'react-native'
// import clr from '../../../../config/colors'
import { styles } from '../SelectRooms'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 650,
    width: 685,
  },
  header: {
    ...StyleSheet.flatten(styles.header),
  },
  headerText: {
    ...StyleSheet.flatten(styles.headerText),
  },
  formCont: {
    ...StyleSheet.flatten(styles.formCont),
  },
  iconCont: {
    ...StyleSheet.flatten(styles.iconCont),
  },
  inputCell: {
    ...StyleSheet.flatten(styles.inputCell),
    // width: 450,
  },
  buttonRow: {
    ...StyleSheet.flatten(styles.buttonRow),
  },
  submitButton: {
    ...StyleSheet.flatten(styles.submitButton),
  },
  submitButtonSecondary: {
    ...StyleSheet.flatten(styles.submitButtonSecondary),
  },
  optCont: {
    ...StyleSheet.flatten(styles.optCont),
  },
  optRow: {
    ...StyleSheet.flatten(styles.optRow),
  },
  optList: {
    ...StyleSheet.flatten(styles.optList),
    width: 325,
  },
  optOption: {
    ...StyleSheet.flatten(styles.optOption),
  },
  optInput: {
    ...StyleSheet.flatten(styles.optInput),
  },
})

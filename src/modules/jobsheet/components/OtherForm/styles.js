import { StyleSheet } from 'react-native'
// import clr from '../../../../config/colors'
import { styles } from '../WindowForm'

export default StyleSheet.create({
  formCont: {
    ...StyleSheet.flatten(styles.formCont),
  },
  formRow: {
    ...StyleSheet.flatten(styles.formRow),
  },
  formCell: {
    ...StyleSheet.flatten(styles.formCell),
  },
  formDetails: {
    ...StyleSheet.flatten(styles.formDetails),
  },
  formDetailRow: {
    ...StyleSheet.flatten(styles.formDetailRow),
  },
  detailInput: {
    ...StyleSheet.flatten(styles.detailInput),
  },
  detailBoxInput: {
    ...StyleSheet.flatten(styles.detailBoxInput),
    width: 260,
  },
  detailTextLabel: {
    ...StyleSheet.flatten(styles.detailTextLabel),
  },
  dimCell: {
    ...StyleSheet.flatten(styles.dimCell),
  },
  dimInput: {
    ...StyleSheet.flatten(styles.dimInput),
  },
  cellLabel: {
    ...StyleSheet.flatten(styles.cellLabel),
  },
  modalLinkText: {
    ...StyleSheet.flatten(styles.modalLinkText),
  },
  picker: {
    ...StyleSheet.flatten(styles.picker),
  },
  pickerSm: {
    ...StyleSheet.flatten(styles.pickerSm),
  },
  pickerItem: {
    ...StyleSheet.flatten(styles.pickerItem),
  },
  pickerItemSm: {
    ...StyleSheet.flatten(styles.pickerItemSm),
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
})

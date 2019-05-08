import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'
import { styles } from '../../../common/components/Modal'
import { styles as formStyles } from '../../../common/components/Form'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 350,
    width: 700,
  },
  body: {
    ...StyleSheet.flatten(styles.body),
    flexDirection: 'row',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  commaLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: clr.primary,
  },
  submitButtonSecondary: {
    backgroundColor: clr.secondary,
  },
  cellLabel: {
    ...StyleSheet.flatten(formStyles.cellLabel),
  },
  col: {
    flexDirection: 'column',
    marginRight: 20,
  },
  optInput: {
    ...StyleSheet.flatten(formStyles.optInput),
    width: 370,
  },
  optList: {
    ...StyleSheet.flatten(formStyles.optList),
  },
  optRow: {
    ...StyleSheet.flatten(formStyles.optRow),
  },
  optOption: {
    ...StyleSheet.flatten(formStyles.optOption),
  },
  pickerSm: {
    ...StyleSheet.flatten(formStyles.pickerSm),
  },
  pickerItemSm: {
    ...StyleSheet.flatten(formStyles.pickerItemSm),
  },
})

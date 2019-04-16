import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'
import { styles } from '../../../common/components/Modal'
import { styles as formStyles } from '../../../common/components/Form'

export default StyleSheet.create({
  submitButton: {
    ...StyleSheet.flatten(formStyles.submitButton),
    width: 350,
  },
  submitButtonCont: {},
  container: {
    ...StyleSheet.flatten(styles.container),
    height: 200,
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 290,
    width: 390,
  },
  body: {
    ...StyleSheet.flatten(styles.body),
  },
  formCont: {
    flexDirection: 'column',
    margin: 20,
  },
  formRow: {
    flexDirection: 'row',
  },
  formCell: {
    flexDirection: 'column',
  },
  formLabel: {
    marginBottom: 5,
    color: clr.dkGray,
  },
  textInput: {
    ...StyleSheet.flatten(formStyles.textInput),
  },
})

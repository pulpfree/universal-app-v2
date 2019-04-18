import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'
import { styles as formStyles } from '../../../common/components/Form'

export default StyleSheet.create({
  button: {
    backgroundColor: clr.primary,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  buttonTitle: {
    fontSize: 16,
    color: clr.white,
  },
  container: {
    flexDirection: 'column',
  },
  cell: {
    flex: 1,
    flexDirection: 'column',
  },
  cellLabel: {
    ...StyleSheet.flatten(formStyles.cellLabel),
  },
  formCont: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formCell: {
    flexDirection: 'column',
  },
  headingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  paymentCell: {
    flex: 1,
  },
  paymentCont: {
    flex: 1,
    flexDirection: 'column',
  },
  paymentHeading: {
    borderBottomColor: clr.dkGray,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    marginTop: 10,
  },
  paymentHeadingText: {
    flex: 1,
    paddingBottom: 5,
  },
  paymentRow: {
    backgroundColor: clr.ltGray,
    borderBottomColor: clr.dkGray,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding: 10,
  },
  paymentRowHiLite: {
    backgroundColor: clr.hiLite,
  },
  textInput: {
    ...StyleSheet.flatten(formStyles.textInput),
    width: 180,
  },
  picker: {
    ...StyleSheet.flatten(formStyles.picker),
    width: 180,
  },
  pickerItem: {
    ...StyleSheet.flatten(formStyles.pickerItem),
  },
})

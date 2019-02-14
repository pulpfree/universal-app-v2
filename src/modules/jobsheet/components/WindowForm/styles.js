import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  formCont: {
    flexDirection: 'column',
    marginBottom: 60,
  },
  formRow: {
    backgroundColor: clr.ltGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  formCell: {
    flexDirection: 'column',
  },
  formDetails: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  formDetailRow: {
    backgroundColor: clr.ltGray,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 4,
  },
  detailInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    height: 35,
    marginRight: 10,
    width: 100,
  },
  detailBoxInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    height: 95,
    width: 300,
  },
  detailTextLabel: {
    color: clr.dkGray,
    fontWeight: '600',
    marginRight: 10,
    width: 150,
  },
  dimCell: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
    // alignContent: 'center',
    alignItems: 'center',
  },
  dimInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    height: 35,
    width: 50,
    paddingLeft: 4,
    paddingRight: 4,
  },
  cellLabel: {
    color: clr.dkGray,
    marginBottom: 7,
    fontWeight: '600',
  },
  modalLinkText: {
    color: clr.primary,
  },
  picker: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    height: 90,
    // marginTop: ,
    paddingBottom: 0,
    paddingTop: 0,
    padding: 5,
    width: 140,
  },
  pickerSm: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    height: 90,
    // marginTop: 5,
    paddingBottom: 0,
    paddingTop: 0,
    padding: 5,
    width: 50,
  },
  pickerItem: {
    fontSize: 17,
    height: 90,
    textAlign: 'left',
  },
  pickerItemSm: {
    fontSize: 17,
    height: 90,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  submitButton: {
    backgroundColor: clr.primary,
  },
  submitButtonSecondary: {
    backgroundColor: clr.black,
  },
})

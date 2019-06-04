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
    paddingLeft: 8,
    width: 100,
  },
  detailBoxInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    height: 95,
    paddingLeft: 8,
    paddingRight: 8,
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
    alignItems: 'center',
  },
  dimInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    fontSize: 17,
    height: 35,
    paddingLeft: 6,
    paddingRight: 4,
    width: 55,
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
    justifyContent: 'space-around',
    padding: 16,
  },
  submitButton: {
    backgroundColor: clr.primary,
  },
  submitButtonSecondary: {
    backgroundColor: clr.black,
  },
})

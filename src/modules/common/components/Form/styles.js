import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  submitButton: {
    backgroundColor: clr.primary,
  },
  cellLabel: {
    color: clr.dkGray,
    marginBottom: 7,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    width: 300,
    height: 35,
    marginBottom: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  optCont: {
    flexDirection: 'row',
  },
  optRow: {
    borderBottomColor: clr.mdGray,
    borderBottomWidth: 0.5,
    marginBottom: 6,
  },
  optList: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 8,
    paddingBottom: 2,
    width: 200,
  },
  optOption: {
    padding: 5,
  },
  optInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    width: 300,
    height: 35,
    marginBottom: 20,
    paddingLeft: 8,
    paddingRight: 8,
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
  pickerItem: {
    fontSize: 17,
    height: 90,
    textAlign: 'left',
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
  pickerItemSm: {
    fontSize: 17,
    height: 90,
    textAlign: 'center',
  },
})

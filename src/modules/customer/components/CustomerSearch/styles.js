import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  checkbox: {
    marginRight: 0,
  },
  checkboxContainer: {
  },
  container: {
    borderBottomColor: clr.mdGray,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'flex-start',
  },
  fields: {
    flexDirection: 'row',
  },
  input: {
    color: clr.black,
  },
  phoneInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    fontSize: 17,
    height: 50,
    margin: 4,
    paddingLeft: 6,
    paddingRight: 4,
    width: 120,
  },
  searchContainer: {
    // flex: 1,
    padding: 10,
    // height: 50,
  },
  switch: {
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  switchLabel: {
    color: clr.dkGray,
    fontWeight: '600',
    paddingLeft: 10,
    paddingRight: 5,
  },
})

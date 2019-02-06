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
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  input: {
    color: clr.black,
  },
  searchContainer: {
    flex: 1,
    padding: 10,
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

import { StyleSheet } from 'react-native'

// import clr from '../../../../config/colors'

export default StyleSheet.create({
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxContainer: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2.05,
    backgroundColor: '#e7e7e7',
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 1,
  },
  checkboxLabel: {
    color: '#6f6f6f',
    paddingLeft: 14,
    fontSize: 16,
  },
  container: {
    minHeight: 500,
  },
  error: {
    color: 'red',
  },
  inputRow: {
    flexDirection: 'row',
    paddingLeft: 20,
  },
  input: {
    flex: 1,
    marginRight: 20,
  },
})

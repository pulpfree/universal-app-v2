import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 2.05,
    backgroundColor: '#e7e7e7',
    borderBottomColor: '#aeaeae',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  checkboxLabel: {
    color: '#6f6f6f',
    paddingLeft: 14,
    fontSize: 16,
  },
  error: {
    color: 'red',
  },
  field: {
    marginBottom: 20,
  },
})

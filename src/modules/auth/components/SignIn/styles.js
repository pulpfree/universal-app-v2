import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  submitButton: {
    backgroundColor: clr.primary,
    marginBottom: 10,
  },
  inputCell: {
    height: 70,
  },
  titleView: {
    marginBottom: 30,
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  errorRow: {
    paddingBottom: 15,
    paddingTop: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 10,
  },
  footerText: {
    color: clr.primary,
    textAlign: 'center',
  },
})

import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    paddingRight: 20,
    paddingBottom: 0,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
  },
  linked: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: clr.primary,
  },
  totalsVal: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
    width: 115,
  },
  total: {
    fontSize: 20,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
})

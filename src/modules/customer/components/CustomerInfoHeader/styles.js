import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  button: {
    width: 140,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  label: {
    textAlign: 'right',
    paddingRight: 5,
    color: clr.dkGray,
    fontWeight: '600',
  },
  value: {
  },
  spacer: {
    height: 15,
  },
})

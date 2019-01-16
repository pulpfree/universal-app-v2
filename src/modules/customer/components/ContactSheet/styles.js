import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    // marginBottom: 10,
    // justifyContent: 'space-between',
    // maxWidth: 300,
  },
  label: {
    fontWeight: '600',
    color: clr.dkGray,
    paddingRight: 15,
  },
  value: {
    paddingRight: 15,
  },
  button: {
    paddingRight: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
})

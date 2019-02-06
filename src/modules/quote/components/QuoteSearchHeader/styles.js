import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  button: {
    width: 140,
  },
  container: {
    borderBottomColor: clr.mdGray,
    borderBottomWidth: 1.5,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cell: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  cellLabel: {
    color: clr.dkGray,
    fontWeight: '600',
    paddingLeft: 40,
    paddingRight: 10,
  },
  picker: {
    height: 80,
    marginTop: 0,
    paddingLeft: 5,
    width: 140,
  },
  pickerItem: {
    fontSize: 17,
    height: 80,
    textAlign: 'left',
  },
})

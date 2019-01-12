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
    paddingLeft: 12,
    paddingRight: 12,
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  cellLabel: {
    color: clr.dkGray,
    fontWeight: '600',
    paddingRight: 10,
  },
  costContainer: {
    borderTopColor: clr.mdGray,
    borderTopWidth: 0.75,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  costCell: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  costLabel: {
    paddingRight: 5,
    color: clr.dkGray,
    fontWeight: '600',
  },
  costValue: {
  },
  picker: {
    height: 60,
    marginTop: 0,
    paddingLeft: 5,
    width: 120,
  },
  pickerItem: {
    fontSize: 17,
    height: 60,
    textAlign: 'left',
  },
})

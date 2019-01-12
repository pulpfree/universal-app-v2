import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'

export default StyleSheet.create({
  header: {
    backgroundColor: clr.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerText: {
    color: clr.ltGray,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    padding: 8.5,
    paddingLeft: 14,
    paddingRight: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: clr.mdGray,
  },
  itemCell: {
    flex: 1,
  },
})

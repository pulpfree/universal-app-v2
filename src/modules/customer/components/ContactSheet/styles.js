import { StyleSheet } from 'react-native'

// todo: import from common
import { styles } from '../../../jobsheet/components/SelectRooms'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 300,
    width: 400,
  },
  header: {
    ...StyleSheet.flatten(styles.header),
  },
  headerText: {
    ...StyleSheet.flatten(styles.headerText),
  },
  infoCont: {
    padding: 20,
  },
  iconCont: {
    ...StyleSheet.flatten(styles.iconCont),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
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

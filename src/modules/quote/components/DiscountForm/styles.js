import { StyleSheet } from 'react-native'

import { styles } from '../../../jobsheet/components/SelectRooms'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 310,
    width: 530,
  },
  header: {
    ...StyleSheet.flatten(styles.header),
  },
  headerText: {
    ...StyleSheet.flatten(styles.headerText),
  },
  formCont: {
    ...StyleSheet.flatten(styles.formCont),
    flexDirection: 'row',
  },
  iconCont: {
    ...StyleSheet.flatten(styles.iconCont),
  },
  cell: {
    flex: 1,
    // padding:
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    // marginRight: 20,
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
  },
  optInput: {
    ...StyleSheet.flatten(styles.optInput),
  },
  submitButton: {
    ...StyleSheet.flatten(styles.submitButton),
  },
})

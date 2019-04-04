import { StyleSheet } from 'react-native'

import clr from '../../../../config/colors'
import { styles } from '../../../common/components/Modal'

export default StyleSheet.create({
  container: {
    ...StyleSheet.flatten(styles.container),
  },
  modalBox: {
    ...StyleSheet.flatten(styles.modalBox),
    height: 320,
    // width: 400,
  },
  body: {
    ...StyleSheet.flatten(styles.body),
  },
  button: {
    backgroundColor: clr.primary,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  buttonTitle: {
    fontSize: 16,
    color: clr.white,
  },
  formCont: {
    flexDirection: 'column',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  infoCont: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: clr.dkGray,
  },
  infoCell: {
    flexDirection: 'column',
  },
  infoRow: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  infoLabel: {
    width: 100,
    color: clr.dkGray,
    fontWeight: '600',
  },
  infoValue: {},
  right: {
    textAlign: 'right',
    width: 60,
  },
  warnText: {
    textAlign: 'center',
    fontSize: 18,
  },
})

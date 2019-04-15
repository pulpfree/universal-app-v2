import { StyleSheet } from 'react-native'
import clr from '../../../../config/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.35)',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
    paddingTop: 50,
  },
  body: {
    padding: 20,
  },
  modalBox: {
    backgroundColor: clr.white,
    borderRadius: 6,
    flexDirection: 'column',
    height: 470,
    shadowColor: '#333',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 560,
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

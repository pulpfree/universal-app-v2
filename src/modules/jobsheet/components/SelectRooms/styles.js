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
  modalBox: {
    backgroundColor: clr.white,
    borderRadius: 6,
    flexDirection: 'column',
    height: 550,
    shadowColor: '#333',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 600,
  },
  header: {
    backgroundColor: clr.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: 50,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: clr.white,
  },
  formCont: {
    padding: 20,
  },
  iconCont: {
    padding: 5,
  },
  inputCell: {
    flexDirection: 'column',
    width: 350,
    marginLeft: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  submitButton: {
    backgroundColor: clr.primary,
  },
  submitButtonSecondary: {
    backgroundColor: clr.black,
  },
  optCont: {
    flexDirection: 'row',
  },
  optRow: {
    borderBottomColor: clr.mdGray,
    borderBottomWidth: 0.5,
    marginBottom: 6,
  },
  optList: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 8,
    paddingBottom: 2,
    width: 200,
  },
  optOption: {
    padding: 5,
  },
  optInput: {
    backgroundColor: clr.white,
    borderColor: clr.mdGray,
    borderRadius: 4,
    borderWidth: 0.5,
    width: 300,
    height: 35,
    marginBottom: 20,
  },
})

import * as u from './utils'

// To test this file, use: yarn test ./src/util/utils.test.js
// To test this file, use: yarn test ./src/util/utils.test.js --watch

const phones = [
  {
    countryCode: '1',
    _id: 'home',
    number: '(905) 687-0000',
  },
  {
    countryCode: '1',
    _id: 'mobile',
    number: '(905) 984-9393',
  },
]

describe('getMobilePhone', () => {
  it('returns mobile phone', () => {
    const num = u.getMobilePhone(phones)
    expect(num).toEqual('(905) 984-9393')
  })
})

describe('stripPhoneDigits', () => {
  it('returns stripped phone number', () => {
    const phone = u.getMobilePhone(phones)
    const strippedPhone = u.stripPhoneDigits(phone)
    expect(strippedPhone).toEqual('9059849393')
    expect(typeof strippedPhone).toEqual('string')
  })
})

describe('phonesArToObj', () => {
  it('return array of phone objects', () => {
    const phoneObj = u.phonesArToObj(phones)
    expect(phoneObj.home.number).toEqual('(905) 687-0000')
  })
})

/* eslint-disable import/prefer-default-export */

export const getMobilePhone = (phones) => {
  const mobile = phones.find(p => (p._id === 'mobile'))
  return mobile ? mobile.number : ''
}

export const stripPhoneDigits = (phone) => {
  const regex = /\d+/g
  const numbers = phone.match(regex)
  return numbers.join('')
}

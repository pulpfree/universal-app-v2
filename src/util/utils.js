export const getMobilePhone = (phones) => {
  const mobile = phones.find(p => (p._id === 'mobile'))
  return mobile ? mobile.number : ''
}

export const stripPhoneDigits = (phone) => {
  const regex = /\d+/g
  const numbers = phone.match(regex)
  return numbers.join('')
}

export const phonesArToObj = (phones) => {
  const phoneObj = {}
  if (!phones || !phones.length > 0) return false
  phones.forEach((ph) => {
    phoneObj[ph._id] = ph.number
  })
  return phoneObj
}

export const extractPhones = (phones) => {
  let numbers = []
  if (undefined === phones) return numbers

  numbers = Object.keys(phones).map(ph => (
    {
      _id: ph,
      countryCode: 1,
      number: phones[ph],
    }
  ))
  return numbers
}

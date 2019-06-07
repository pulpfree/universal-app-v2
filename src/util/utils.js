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

// found this at: https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-233.php
export const flattenObject = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
  const pre = prefix.length ? `${prefix}.` : ''
  if (typeof obj[k] === 'object') {
    Object.assign(acc, flattenObject(obj[k], pre + k))
  } else {
    acc[pre + k] = obj[k]
  }
  return acc
}, {})

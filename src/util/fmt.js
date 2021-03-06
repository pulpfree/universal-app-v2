import moment from 'moment'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
export function fmtMoney(number, decimal = 2, useGrouping = false, currency = false) {
  if (number === undefined) return null

  const opts = {
    useGrouping,
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }
  if (currency) {
    opts.style = 'currency'
    opts.currency = 'USD'
  }
  const formatter = new Intl.NumberFormat('en-US', opts)
  return formatter.format(number)
}

export function fmtHumanDate(date) {
  const dte = new Date(date)
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  return dte.toLocaleDateString('en-US', options)
}

export function fmtDate(date) {
  const dte = moment(date)
  return dte.format('YYYY-MM-DD')
}

// todo: should put this into the utils file, and rename to phone
export function fmtPhone(value) {
  const digits = value.replace(/[^\d]/g, '')

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
}

export function fmtPostalCode(code) {
  const postalCode = code.trim()
  if (postalCode.length < 6) return postalCode
  const validPat = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] ?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i
  const valid = validPat.test(postalCode)
  if (!valid) return ''

  // add space if missing
  if (postalCode.length === 6) {
    const re = /(.{3})(.{3})/
    return postalCode.replace(re, '$1 $2')
  }

  return postalCode
}

export function ucFirst(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

export function capitalize(s) {
  return ucFirst(s)
}

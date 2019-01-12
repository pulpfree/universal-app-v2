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

export function ucFirst(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
}

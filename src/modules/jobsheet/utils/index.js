import ramda from 'ramda'
import { Types } from 'mongoose'

function calcDecimal(fraction) {
  const fracPcs = fraction.split('/')
  return parseFloat(Number(fracPcs[0]) / Number(fracPcs[1]))
}

function calcRound(decimal) {
  let round = Math.ceil(decimal)
  if (round % 2 !== 0) {
    round += 1
  }
  return round
}

/**
 * Job Sheet functions
 */

export const prepareAddress = (address, customerID) => {
  const newAddress = { ...address }

  delete newAddress.__typename
  delete newAddress.location.__typename
  delete newAddress._id

  newAddress.associate = 'jobsheet'
  newAddress.customerID = Types.ObjectId(customerID)

  return newAddress
}

/**
 * Window functions
*/

export const calcSizes = (window) => {
  if (
    !ramda.hasPath(['dims', 'height', 'inch'], window)
    || !ramda.hasPath(['dims', 'height', 'inch'], window)
  ) return false

  let decimal = 0.00
  const newWin = {
    dims: {
      height: {
        decimal: null,
        fraction: '',
        inch: null,
        overSize: null,
        round: null,
        underSize: null,
      },
      width: {
        decimal: null,
        fraction: '',
        inch: null,
        overSize: null,
        round: null,
        underSize: null,
      },
    },
    specs: {
      overSize: null,
      sqft: null,
    },
  }
  newWin.dims.height.inch = window.dims.height.inch ? Number(window.dims.height.inch) : ''
  newWin.dims.width.inch = window.dims.width.inch ? Number(window.dims.width.inch) : ''

  // do width calculations
  if (ramda.hasPath(['dims', 'width', 'fraction'], window) && window.dims.width.fraction) {
    newWin.dims.width.fraction = window.dims.width.fraction
    decimal = calcDecimal(window.dims.width.fraction)
  }
  newWin.dims.width.decimal = parseFloat(newWin.dims.width.inch + decimal)
  newWin.dims.width.round = calcRound(newWin.dims.width.decimal)

  // do height calculations
  decimal = 0.00
  if (ramda.hasPath(['dims', 'height', 'fraction'], window) && window.dims.height.fraction) {
    newWin.dims.height.fraction = window.dims.height.fraction
    decimal = calcDecimal(window.dims.height.fraction)
  }
  newWin.dims.height.decimal = parseFloat(newWin.dims.height.inch + decimal)
  newWin.dims.height.round = calcRound(newWin.dims.height.decimal)

  const sqft = newWin.dims.width.round * newWin.dims.height.round / 144
  newWin.specs.sqft = Math.ceil(sqft)
  newWin.specs.extendSqft = newWin.specs.sqft * window.qty

  return newWin
}

export const validateSizes = (window, product) => {
  const newWin = {
    dims: {
      ...window.dims,
    },
    specs: {
      ...window.specs,
      overSize: 0,
    },
  }
  const winW = Math.ceil(window.dims.width.decimal)
  const winH = Math.ceil(window.dims.height.decimal)
  const sqft = Math.ceil(winW * winH / 144)

  if (winW > product.maxWidth) {
    newWin.dims.width.overSize = (winW - product.maxWidth)
  } else if (winW < product.minWidth) {
    newWin.dims.width.underSize = (product.minWidth - winW)
  }

  if (winH > product.maxHeight) {
    newWin.dims.height.overSize = (winH - product.maxHeight)
  } else if (winH < product.minHeight) {
    newWin.dims.height.underSize = (product.minHeight - winH)
  }

  if (sqft > product.premium.oversizeLimit) {
    newWin.specs.overSize = (sqft - product.premium.oversizeLimit)
  }

  return newWin
}

export const calcCosts = (window, product) => {
  let premium = 0
  let productCost = 0
  const { costs, specs } = window
  const maxStdSize = product.premium.oversizeLimit
  const retCosts = {
    install: parseFloat(costs.install) || 0,
    installType: parseFloat(costs.installType) || 0,
    options: parseFloat(costs.options) || 0,
    discounted: parseFloat(costs.discounted) || 0,
    trim: parseFloat(costs.trim) || 0,
  }

  if (specs.overSize) {
    premium = specs.overSize * product.premium.cost
    productCost = product.sizeCost[[maxStdSize]] || 0.00
  } else {
    productCost = product.sizeCost[[specs.sqft]] || 0.00
  }

  retCosts.window = parseFloat(productCost + premium)
  const unit = retCosts.window
    + costs.install
    + costs.installType
    + costs.options
    + costs.trim

  const extendUnit = costs.discounted || unit
  retCosts.extendUnit = parseFloat(extendUnit)
  retCosts.netUnit = parseFloat(unit)
  retCosts.discountAmount = costs.discounted ? unit - costs.discounted : 0
  retCosts.extendTotal = parseFloat(window.qty * extendUnit)

  return retCosts
}

export const prepareDoc = (window) => {
  const doc = ramda.clone(window)

  delete doc.__typename
  delete doc.costs.__typename
  delete doc.dims.__typename
  delete doc.dims.height.__typename
  delete doc.dims.width.__typename
  delete doc.specs.__typename
  doc.productID = Types.ObjectId(window.productID._id)
  doc.jobsheetID = Types.ObjectId(window.jobsheetID)
  if (window.windowID) {
    doc._id = Types.ObjectId(doc.windowID)
  } else {
    delete doc._id
  }
  delete doc.windowID

  return doc
}

/*
 * Group functions
*/

export const calcGroupWindowCosts = (window, product) => {
  let premium = 0
  let productCost = 0
  const { specs } = window
  const maxStdSize = product.premium.oversizeLimit
  const retCosts = {}

  if (specs.overSize) {
    premium = specs.overSize * product.premium.cost
    productCost = product.sizeCost[[maxStdSize]]
  } else {
    productCost = product.sizeCost[[specs.sqft]]
  }
  retCosts.extendUnit = parseFloat(productCost + premium)
  retCosts.extendTotal = parseFloat(window.qty * retCosts.extendUnit)

  return retCosts
}

export const calcGroupCosts = (group) => {
  let windows = 0.00
  if (group.items.length) {
    windows = group.items.reduce(
      (accumulator, curVal) => accumulator + curVal.costs.extendTotal,
      0.00
    )
  }

  const costs = {
    install: parseFloat(group.costs.install) || 0,
    installType: parseFloat(group.costs.installType) || 0,
    options: parseFloat(group.costs.options) || 0,
    discounted: parseFloat(group.costs.discounted) || 0,
    trim: parseFloat(group.costs.trim) || 0,
    windows: parseFloat(windows),
  }

  const unit = costs.windows
    + costs.install
    + costs.installType
    + costs.options
    + costs.trim
  costs.netUnit = parseFloat(unit)
  costs.extendUnit = costs.discounted > 0 ? costs.discounted : unit
  costs.discountAmount = costs.discounted ? unit - costs.discounted : 0
  costs.extendTotal = parseFloat(costs.extendUnit * group.qty)

  return costs
}

export const calcGroupSizes = (dims) => {
  const haveWidthInch = (ramda.hasPath(['width', 'inch'], dims) && dims.width.inch >= 10)
  const haveHeightInch = (ramda.hasPath(['height', 'inch'], dims) && dims.height.inch >= 10)
  if (!(haveHeightInch && haveWidthInch)) return false

  let decimal = 0.00
  const newWin = {
    dims: {
      height: {
        decimal: null,
        diff: null,
        fraction: '',
        inch: null,
      },
      width: {
        decimal: null,
        diff: null,
        fraction: '',
        inch: null,
      },
    },
  }

  newWin.dims.height.inch = dims.height.inch ? Number(dims.height.inch) : ''
  newWin.dims.width.inch = dims.width.inch ? Number(dims.width.inch) : ''

  // do width calculations
  if (ramda.hasPath(['width', 'fraction'], dims) && dims.width.fraction) {
    newWin.dims.width.fraction = dims.width.fraction
    decimal = calcDecimal(dims.width.fraction)
  }
  newWin.dims.width.decimal = parseFloat(newWin.dims.width.inch + decimal)

  // do height calculations
  decimal = 0.00
  if (ramda.hasPath(['height', 'fraction'], dims) && dims.height.fraction) {
    newWin.dims.height.fraction = dims.height.fraction
    decimal = calcDecimal(dims.height.fraction)
  }
  newWin.dims.height.decimal = parseFloat(newWin.dims.height.inch + decimal)

  return newWin
}

export const prepareGroupDoc = (group) => {
  const doc = ramda.clone(group)

  delete doc.__typename
  delete doc.id
  delete doc.costs.__typename
  delete doc.dims.__typename
  delete doc.dims.height.__typename
  delete doc.dims.width.__typename
  delete doc.specs.__typename

  for (let i = 0; i < doc.items.length; i += 1) {
    delete doc.items[i].__typename
    delete doc.items[i].costs.__typename
    delete doc.items[i].dims.__typename
    delete doc.items[i].dims.height.__typename
    delete doc.items[i].dims.width.__typename
    delete doc.items[i].specs.__typename
    delete doc.items[i].product.__typename

    doc.items[i].productID = Types.ObjectId(doc.items[i].productID)
    doc.items[i]._id = Types.ObjectId(doc.items[i]._id)
  }

  if (doc.groupID) {
    doc._id = Types.ObjectId(doc.groupID)
  } else {
    delete doc._id
  }
  delete doc.groupID
  doc.jobsheetID = Types.ObjectId(doc.jobsheetID)

  return doc
}

/**
 * Other Item functions
 */

export const prepareOtherDoc = (other) => {
  const doc = ramda.clone(other)

  delete doc.__typename
  delete doc.costs.__typename
  delete doc.specs.__typename

  if (doc.otherID) {
    doc._id = Types.ObjectId(doc.otherID)
  } else {
    delete doc._id
  }
  delete doc.otherID
  doc.jobsheetID = Types.ObjectId(doc.jobsheetID)
  return doc
}

/**
 * Utility functions
 */

export const callSetSizeCalc = (field) => {
  let parts = []
  if (field === 'qty') return true
  if (field.indexOf('.') > 0) parts = field.split('.')
  if (parts[0] === 'dims') return true
  if (parts[0] === 'specs') return true

  return false
}

export const execSetSizeCalc = (window) => {
  if (!window.productID && !window.productID._id) return false
  const { dims } = window
  const haveWidthInch = (ramda.hasPath(['width', 'inch'], dims) && dims.width.inch >= 10)
  const haveHeightInch = (ramda.hasPath(['height', 'inch'], dims) && dims.height.inch >= 10)
  const haveQty = window.qty >= 1
  if (haveHeightInch && haveWidthInch && haveQty) return true
  return false
}

/**
 * Helper functions
 */

/**
 * parseJson
 * @param {object} js
 * @returns {json}
 */
export const parseJson = (js) => {
  try {
    const json = JSON.parse(js)
    return json
  } catch (e) {
    return js
  }
}

const setMobile = (item) => {
  const mobile = item.customer.phones.find(p => (p._id === 'mobile'))
  return mobile ? mobile.number : ''
}

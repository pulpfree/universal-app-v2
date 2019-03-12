/* eslint-disable no-console */
import { Linking, Platform } from 'react-native'

/**
 * Linking functions
 * Note: linkMap is currently the only ios and android configured function
 */

export async function linkEmail(email) {
  const url = `mailto:${email}`
  await Linking.openURL(url)
    .catch(err => console.error('An error occurred', err))
}

export async function linkCall(number) {
  const url = `tel:${number}`
  await Linking.openURL(url)
    .catch(err => console.error('An error occurred', err))
}

export async function linkMessage(number) {
  const url = `sms:${number}`
  await Linking.openURL(url)
    .catch(err => console.error('An error occurred', err))
}

/**
 * @todo: update to use required params: address, region in function arguments
 */
export async function linkMap() {
  const { address } = this.props
  const { region } = this.state
  const { latitude, longitude } = region
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
  const latLng = `${latitude},${longitude}`
  const label = address.street1
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  })

  await Linking.openURL(url)
    .catch(err => console.error('An error occurred', err))
}

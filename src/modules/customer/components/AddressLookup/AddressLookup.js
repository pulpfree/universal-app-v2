import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { ModalHeader } from '../../../common/components/ModalHeader'
import styles from './styles'
import { GoogleAPIKey } from '../../../../config/constants'

const AddressLookup = ({ navigation }) => (
  <View style={styles.container}>
    <View style={[styles.modalBox]}>
      <ModalHeader title="Address Lookup" />

      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus
        returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance="light" // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails
        // renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          // console.log('data and details: ', data, details) // eslint-disable-line
          navigation.navigate('CustomerNew', { mapParams: details })
        }}

        getDefaultValue={() => ''}

        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: GoogleAPIKey,
          components: 'country:ca',
          language: 'en', // language of the results
          // types: '(cities)' // default: 'geocode'
          types: 'address', // default: 'geocode'
          // types: '(geocode)' // default: 'geocode'
          location: '42.997892, -79.2864486', // Joe's home address
          radius: '40000', // 50 km
          strictbounds: true,
        }}

        styles={{
          textInputContainer: {
            width: '100%',
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          rankby: 'distance',
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          // type: 'cafe'
        }}

        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: 'formatted_address,address_component',
        }}

        filterReverseGeocodingByTypes={['street_address']}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    </View>
  </View>
)
AddressLookup.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
}

export default withNavigation(AddressLookup)

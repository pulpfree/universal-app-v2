import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

const { Provider, Consumer } = React.createContext()

class SearchProvider extends React.Component {
  state={
    isActive: true,
    lastName: true,
    phoneNumber: false,
    streetName: false,
    searchVal: '',
  }

  _handleSearchVal = debounce((val) => {
    this.setState({ searchVal: val })
  }, 350)

  _handleActive = (active) => {
    this.setState({ isActive: active })
  }

  _handleLastName = (flag) => {
    this.setState({ lastName: flag, streetName: !flag, phoneNumber: !flag })
  }

  _handleStreetName = (flag) => {
    this.setState({ streetName: flag, lastName: !flag, phoneNumber: !flag })
  }

  _handlePhoneNumber = (flag) => {
    this.setState({ phoneNumber: flag, lastName: !flag, streetName: !flag })
  }

  render() {
    const {
      isActive,
      lastName,
      phoneNumber,
      searchVal,
      streetName,
    } = this.state
    const { children } = this.props

    return (
      <Provider
        value={{
          isActive,
          lastName,
          phoneNumber,
          searchVal,
          streetName,
          setActive: this._handleActive,
          setPhoneNumber: this._handlePhoneNumber,
          setSearchVal: this._handleSearchVal,
          setLastName: this._handleLastName,
          setStreetName: this._handleStreetName,
        }}
      >
        {children}
      </Provider>
    )
  }
}
SearchProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

function withSearch(Component) {
  return function Search(props) {
    return (
      <Consumer>
        {({
          isActive,
          lastName,
          phoneNumber,
          searchVal,
          streetName,
        }) => (
          <Component
            {...props}
            isActive={isActive}
            searchVal={searchVal}
            lastName={lastName}
            phoneNumber={phoneNumber}
            streetName={streetName}
          />
        )}
      </Consumer>
    )
  }
}

export { SearchProvider, Consumer as SearchConsumer, withSearch }

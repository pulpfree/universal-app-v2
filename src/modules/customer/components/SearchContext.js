import React from 'react'
import PropTypes from 'prop-types'

const { Provider, Consumer } = React.createContext()

class SearchProvider extends React.Component {
  state={
    isActive: true,
    lastName: true,
    streetName: false,
    searchVal: '',
  }

  _handleActive = (active) => {
    this.setState({ isActive: active })
  }

  _handleSearchVal = (val) => {
    this.setState({ searchVal: val })
  }

  _handleLastName = (flag) => {
    this.setState({ lastName: flag, streetName: !flag })
  }

  _handleStreetName = (flag) => {
    this.setState({ streetName: flag, lastName: !flag })
  }

  render() {
    const {
      isActive,
      lastName,
      searchVal,
      streetName,
    } = this.state
    const { children } = this.props

    return (
      <Provider
        value={{
          isActive,
          lastName,
          searchVal,
          streetName,
          setActive: this._handleActive,
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
          searchVal,
          streetName,
        }) => (
          <Component
            {...props}
            isActive={isActive}
            searchVal={searchVal}
            lastName={lastName}
            streetName={streetName}
          />
        )}
      </Consumer>
    )
  }
}

export { SearchProvider, Consumer as SearchConsumer, withSearch }

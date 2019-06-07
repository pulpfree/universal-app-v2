import React from 'react'
import PropTypes from 'prop-types'

const { Provider, Consumer } = React.createContext()

class SearchProvider extends React.Component {
  state={
    closed: false,
    invoiced: false,
    period: '',
  }

  _handleClosed = (closed) => {
    this.setState({ closed })
  }

  _handleInvoiced = (invoiced) => {
    this.setState({ invoiced })
    if (invoiced === false) {
      this.setState({ closed: false })
    }
  }

  _handlePeriod = (period) => {
    this.setState({ period })
  }

  render() {
    const {
      invoiced,
      closed,
      period,
    } = this.state
    const { children } = this.props

    return (
      <Provider
        value={{
          closed,
          invoiced,
          period,
          setClosed: this._handleClosed,
          setInvoiced: this._handleInvoiced,
          setPeriod: this._handlePeriod,
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
        {({ period, invoiced, closed }) => (
          <Component
            {...props}
            period={period}
            invoiced={invoiced}
            closed={closed}
          />
        )}
      </Consumer>
    )
  }
}

export { SearchProvider, Consumer as SearchConsumer, withSearch }

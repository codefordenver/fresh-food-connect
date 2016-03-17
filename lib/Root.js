import React, { Component, PropTypes } from 'react'
import DevTools from 'components/DevTools'
import FCCRouter from 'components/FCCRouter'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import configureStore from 'persistence/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

export default class Root extends Component {
  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme()
    }
  }

  render() {
    const { history } = this.props
    return (
      <Provider key='provider' store={store}>
        <div>
          <FCCRouter history={history} store={store} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Home from './components/layout/landing/Home';
export const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
      </Router>
    </Provider>
  )
}

export default App;
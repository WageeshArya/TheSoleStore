import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import Home from './components/layout/landing/Home';
import Shoes from './components/layout/productsMain/Shoes';
import Product from './components/layout/productsMain/Product';
import Users from './components/layout/users/Users';
import Orders from './components/layout/orders/Orders';
import Admins from './components/layout/admins/Admins';

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shoes" component={Shoes} />
          <Route exact path="/shoes/:productId" component={Product} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/admins" component={Admins}/>
          {/* <Route component={NotFound} /> */}
        </Switch>
      </div>
      </Router>
    </Provider>
  )
}

export default App;
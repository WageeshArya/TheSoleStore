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
import Dash from './components/layout/admins/Dash';
import Cart from './components/layout/cart/Cart';
import About from './components/layout/about/About';
import NotFound from './components/layout/notFound/NotFound';
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
          <Route exact path="/admins/dash" component={Dash} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </div>
      </Router>
    </Provider>
  )
}

export default App;
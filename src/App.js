import React, { Component } from 'react';
import './styles/app.scss';
import { Route, Switch } from "react-router";
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';

import ProductList from './components/ProductList';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './utils/auth';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="App-content">
          <Switch>
            <Route path="/" exact component={ProductList} />
            <Route path="/products/:id" component={Product} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </main >
        <Footer />
      </div >
    );
  }
}


const Header = () => {
  if(Cookie.get('username'))
    return(
      <header className="App-header">
        <Link to="/"><h2>🐙Home</h2></Link>
        <div className="right">
          <span>hello, {Cookie.get('username')}</span>
          <button onClick={Logout}><h2>Logout</h2></button>
        </div>
      </header>
    );
  return (
    <header className="App-header">
      <Link to="/"><h2>🐙Home</h2></Link>
      <div className="right">
        <Link to="/login"><h2>Login</h2></Link>
        <Link to="/register"><h2>Register</h2></Link>
      </div>
    </header>
  );
}

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="left">
        BKshop -- Call: 0123456789
      </div>
      <div className="right">
        <a href="https://github.com/snipcart/snipcart-strapi-react" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i> GitHub</a>
        <a href="https://twitter.com/snipcart" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i> Twitter</a>
      </div>
    </footer>
  );
}

export default App;
import React, { Component } from 'react';
import { Route, Switch } from "react-router";
import Cookie from "js-cookie";
import '../styles/pages/adminPages.scss';

import AdminSideBar from '../components/AdminSideBar';
import AdminDashboard from './admin_dashBoard';
import AccountList from './admin_account/admin_accountList';
import AccountInfo from './admin_account/admin_accountInfo';
import AccountUpdate from './admin_account/admin_accountUpdate';
import ProductList from './admin_product/admin_productList';
import ProductInfo from './admin_product/admin_productInfo';
import ProductUpdate from './admin_product/admin_productUpdate';
import ProductCreate from './admin_product/admin_productCreate';
import OrderList from './admin_order/admin_orderList';
import OrderUpdate from './admin_order/admin_orderUpdate';

class AdminPages extends Component {
  constructor(props) {
    super(props);

    if(Cookie.get('role') === 'Admin'){
        this.state = {
            authenticate: true,
        }
    }
    else{
        this.state = {
            authenticate: false,
        }
    }
  }

  async componentDidMount() {
  }

  render() {
    if (this.state.authenticate) {
      return (
        <div className="body">
          <AdminSideBar />
          <div className="content">
            <Switch>
              <Route path="/admin" exact component={AdminDashboard} />
              <Route path="/admin/accounts" component={AccountList} />
              <Route path="/admin/account/:id" exact component={AccountInfo} />
              <Route path="/admin/account/:id/update" component={AccountUpdate} />
              <Route path="/admin/products" exact component={ProductList} />
              <Route path="/admin/products/create" component={ProductCreate} />
              <Route path="/admin/product/:id/" exact component={ProductInfo} />
              <Route path="/admin/product/:id/update" component={ProductUpdate} />
              <Route path="/admin/orders" component={OrderList} />
              <Route path="/admin/order/:id/update" component={OrderUpdate} />
            </Switch>
          </div>
        </div>
      );
    }
    return <h2 className="ProductList-title">You need to login Admin account</h2>
  }
}

export default AdminPages;
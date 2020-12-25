import React, { Component } from 'react';
import { Route, Switch } from "react-router";
import Cookie from "js-cookie";
import '../styles/pages/adminPages.scss';

import AdminSideBar from '../components/AdminSideBar';
import AdminDashboard from './admin_dashBoard';
import AccountList from './admin_accountList';
import AccountInfo from './admin_accountInfo';
import AccountUpdate from './admin_accountUpdate';

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
            </Switch>
          </div>
        </div>
      );
    }
    return <h2 className="ProductList-title">You need to login Admin account</h2>
  }
}

export default AdminPages;
import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

class AccountList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      users: []
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let users = await response.json();
      this.setState({ loading: false,authenticate: true, users: users });
      return
    }
    this.setState({authenticate: false});
  }

  filterSubmmitHandle(){

  }


  render() {
    const clickInfo = (id) =>{
      window.location.href = "/admin/account/" + id;
    }

    const clickUpdate = (id) =>{
      window.location.href = "/admin/account/" + id + "/update";
    }

    const clickDestroy = (id) =>{
      axios
        .delete(process.env.REACT_APP_BACKEND_URL + "/users/" + id,{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(response => {
          alert('Destroy success.');
          window.location.href = "/admin/accounts"
        })
        .catch(error => {
          // Handle error.
          alert('Update failed !!!');
          console.log('An error occurred:', error.response);
        });
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="DataList">
          <h2 className="DataList-title">Accounts ({this.state.users.length})</h2>
          <div className="DataList-container">
            
            <div className="DataList-filter" onSubmit={this.filterSubmmitHandle}>
              <form className="form-inline w-100">
                <input className="form-control" name="user_filter" type="text" placeholder="Tìm kiếm Theo Username"/>
                <input className="form-control" name="gmail_filter" type="text" placeholder="Tìm kiếm Theo Gmail" />
              </form>
            </div>

            <table className="table">
              <thead>
              <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Gmail</th>
                  <th>Blocked</th>
                  <th>Type</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.blocked.toString()}</td>
                      <td>{user.role.name}</td>
                      <td>
                      <div className="dropdown">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                          Select
                        </button>
                        <div className="dropdown-menu">
                          <button className="dropdown-item" onClick={() =>clickInfo(user.id)} >More Info</button>
                          <button className="dropdown-item" onClick={() =>clickUpdate(user.id)} >Update</button>
                          <button className="dropdown-item" onClick={() =>clickDestroy(user.id)} >Destroy</button>
                        </div>
                      </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )
    }
    if(!this.state.authenticate){
      return <h2 className="ProductList-title">You need to login</h2>
    }
    return (<h2 className="ProductList-title">Waiting for API...</h2>);
  }
}

export default AccountList;
import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

class AccountUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      roleValue: "",
      user: {},
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + this.props.match.params.id,{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let data = await response.json();
      this.setState({ loading: false, authenticate: true, roleValue:data.role.name, user: data });
      return
    }
    this.setState({authenticate: false});
  }

  render() {
    const clickSubmit = (event) =>{
      event.preventDefault();
      axios
        .put(process.env.REACT_APP_BACKEND_URL + '/users/' + this.state.user.id, {
          email: this.state.user.email,
          username: this.state.user.username,
        },{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(response => {
          alert('Update success.')
        })
        .catch(error => {
          // Handle error.
          alert('Update failed !!!');
          console.log('An error occurred:', error.response);
        });
      return;
    }


    const clickBack = (event) => {
      event.preventDefault();
      window.location.href = "/admin/accounts";
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="container">

        <div className="row">

            <div className="col-xl-8 offset-xl-2">

                <h1 style={{fontSize: 50+'px'}}>Account Update</h1>


                <form id="contact-form" onSubmit={clickSubmit}>

                    <div className="messages"></div>

                    <div className="controls">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_username">Username :</label>
                                    <input id="form_username" type="text" name="username" className="form-control" value={this.state.user.username} required="required"
                                        data-error="Username is required." onChange={(e)=>this.setState({user:{...this.state.user,username:e.target.value}})} />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_email">Email :</label>
                                    <input id="form_email" type="email" name="email" className="form-control" value={this.state.user.email} required="required"
                                        data-error="Email is required." onChange={(e)=>this.setState({user:{...this.state.user,email:e.target.value}})}/>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_role">Role :</label>
                                    <select id="form_role" className="form-control" value={this.state.roleValue} onChange={(e)=>this.setState({roleValue:e.target.value})}>
                                        <option value="Public"> Public</option>
                                        <option value="Authenticated"> Authenticated</option>
                                        <option value="Admin"> Admin</option>
                                    </select>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_blocked">Blocked :</label>
                                    <select id="form_blocked" className="form-control" value={this.state.blockedValue} onChange={(e)=>this.setState({blockedValue:e.target.value})}>
                                        <option value="True"> True</option>
                                        <option value="False"> False</option>
                                    </select>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_confirmed">Confirmed :</label>
                                    <select id="form_confirmed" className="form-control" value={this.state.ConfirmedValue} onChange={(e)=>this.setState({ConfirmedValue:e.target.value})}>
                                        <option value="True"> True</option>
                                        <option value="False"> False</option>
                                    </select>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>

                        <div id="result" style={{color:"red"}}>
                        </div>
                        <input type="submit" className="btn btn-primary" style={{marginRight:20+"px"}} value="Save" />
                        <button className="btn btn-primary" onClick={e => clickBack(e)} > Back</button>
                    </div>
                </form>
                

                </div>
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

export default AccountUpdate;
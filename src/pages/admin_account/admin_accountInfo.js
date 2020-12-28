import React, { Component } from 'react';
import Cookie from "js-cookie";

class AccountInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
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
      this.setState({ loading: false,authenticate: true, user: data });
      return
    }
    this.setState({authenticate: false});
  }


  render() {
    const clickUpdate = () =>{
      window.location.href = "/admin/account/" + this.state.user.id + "/update";
    }

    const clickBack = () =>{
        window.location.href = "/admin/accounts";
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="container bootstrap snippet">
            <div className="panel-body inf-content col-xl-8 offset-xl-2">
                <strong>THÔNG TIN TÀI KHOẢN :</strong><br/>

                <div className="table-responsive">
                <table className="table table-user-information">
                    <tbody>
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-asterisk text-primary"></span>
                                    Account ID:                                            
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.user.id}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Username:                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.user.username}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Email:                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.user.email}
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    Create At:                                             
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.user.createdAt}
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    Role:                                           
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.user.role.name}
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    Blocked:                                     
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.user.blocked.toString()}
                            </td>
                        </tr>

                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    Confirmed:                                 
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.user.confirmed.toString()}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    <button className="btn btn-primary" onClick={clickUpdate} style={{marginRight:30+"px"}}>Update</button>
                                    <button className="btn btn-primary" onClick={clickBack}>Back</button>
                                </strong>
                            </td>
                        </tr>                                
                    </tbody>
                </table>
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

export default AccountInfo;
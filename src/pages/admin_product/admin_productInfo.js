import React, { Component } from 'react';
import Cookie from "js-cookie";

class ProductInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      product: {},
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/products/" + this.props.match.params.id,{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let data = await response.json();
      console.log(data)
      this.setState({ loading: false,authenticate: true, product: data });
      return
    }
    this.setState({authenticate: false});
  }


  render() {
    const clickUpdate = () =>{
      window.location.href = "/admin/product/" + this.state.product.id + "/update";
    }

    const clickBack = () =>{
        window.location.href = "/admin/products";
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="container bootstrap snippet">
            <div className="panel-body inf-content col-xl-8 offset-xl-2">
                <strong>THÔNG TIN SẢN PHẨM :</strong><br/>

                <div className="table-responsive">
                <table className="table table-user-information">
                    <tbody>
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-asterisk text-primary"></span>
                                    Product ID:                                            
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.id}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Name :                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.name}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Description :                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.description}
                            </td>
                        </tr>
                        <tr>    
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-user  text-primary"></span>    
                                    Category:                                       
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.category.name}
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
                                {this.state.product.createdAt}
                            </td>
                        </tr>
                        
                        <tr>        
                            <td>
                                <strong>
                                    <span className="glyphicon glyphicon-cloud text-primary"></span>  
                                    Last Update:                                           
                                </strong>
                            </td>
                            <td className="text-primary">
                                {this.state.product.updatedAt}
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

export default ProductInfo;
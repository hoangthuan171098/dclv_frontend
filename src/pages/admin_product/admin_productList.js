import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      products: []
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/products",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let products = await response.json();
      this.setState({ loading: false,authenticate: true, products: products });
      return
    }
    this.setState({authenticate: false});
  }


  render() {
    const clickInfo = (id) =>{
      window.location.href = "/admin/product/" + id;
    }

    const clickUpdate = (id) =>{
      window.location.href = "/admin/product/" + id + "/update";
    }

    const clickDestroy = (id) =>{
      axios
        .delete(process.env.REACT_APP_BACKEND_URL + "/products/" + id,{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(response => {
          alert('Destroy success.');
          window.location.href = "/admin/products"
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
          <h2 className="DataList-title">Products ({this.state.products.length})</h2>
          <a href="/admin/products/create"><button className="btn btn-primary"> Create A New Product</button></a>
          <div className="DataList-container">
            <div className="DataList-filter" onSubmit={this.filterSubmmitHandle}>
              <form className="form-inline w-100">
                <input className="form-control" name="name_filter" type="text" placeholder="Tìm kiếm Theo Name"/>
                <input className="form-control" name="id_filter" type="text" placeholder="Tìm kiếm Theo ID" />
              </form>
            </div>

            <table className="table">
              <thead>
              <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price1</th>
                  <th>Price2</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
                {this.state.products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.category.name}</td>
                      <td>{product.price}</td>
                      <td>{product.price2}</td>
                      <td>
                      <div className="dropdown">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                          Select
                        </button>
                        <div className="dropdown-menu">
                          <button className="dropdown-item" onClick={() =>clickInfo(product.id)} >More Info</button>
                          <button className="dropdown-item" onClick={() =>clickUpdate(product.id)} >Update</button>
                          <button className="dropdown-item" onClick={() =>clickDestroy(product.id)} >Destroy</button>
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

export default ProductList;
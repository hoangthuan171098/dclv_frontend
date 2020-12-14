import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie";

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
    if(Cookie.get('role') === 'Authenticated'){     
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
    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="ProductList">
          <h2 className="ProductList-title">Available Products ({this.state.products.length})</h2>
          <div className="ProductList-container">
            {this.state.products.map((product, index) => {
              return (
                <div className="ProductList-product" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.name}</h3>
                    <h6>Loại: {product.category.name}</h6>
                    <p>{product.description}</p>
                    <p>Giá :{product.price}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    if(!this.state.authenticate){
      return <h2 className="ProductList-title">You need to login</h2>
    }
    return (<h2 className="ProductList-title">Waiting for API...</h2>);
  }
}

export default ProductList;
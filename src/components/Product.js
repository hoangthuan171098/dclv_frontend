import React, { Component } from 'react';
import Cookie from 'js-cookie';

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true,authenticate: true, product: {} }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Authenticated' || Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + `/products/${this.props.match.params.id}`,{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let data = await response.json();
      this.setState({ loading: false,authenticate: true, product: data });
      return
    }
    this.setState({authenticate: false});
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="product">
          <div className="product__information">
            <h2 className="Product-title">{this.state.product.name}</h2>
          </div>
          <div className="product__description">
            {this.state.product.description}
          </div>
        </div>
      );
    }
    if (!this.state.authenticate){
      return (<h2>You need to login!</h2>);
    }

    return (<h2>Waiting for API...</h2>);
  }
}

export default Product;
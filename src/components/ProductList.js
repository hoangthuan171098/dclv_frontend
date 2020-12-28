import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie";
import axios from "axios";

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      products: [],
      cart: {items:[], total:0},
    }
  }

  async componentDidMount() {
    const cart = Cookie.get('cart');
    let total = 0;
    if(typeof cart === "string" && cart !== "undefined"){
      JSON.parse(cart).forEach(item => {
        total = total + item.price1*item.quantity1 + item.price2*item.quantity2;
      });
      this.setState({
        cart: { items: JSON.parse(cart), total: total },
      });
    }
    if(Cookie.get('role') === 'Authenticated' || Cookie.get('role') === 'Admin'){     
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

    const addItem = (item) => {
      let { items } = this.state.cart;
      let input1Value = Number(document.getElementsByClassName("input1-for-"+item.id)[0].value);
      let input2Value = Number(document.getElementsByClassName("input2-for-"+item.id)[0].value);
      if(input1Value<1 && input2Value<1){
        return;
      }
      const newItem = items.find((i) => i.id === item.id);
      if (!newItem) {
        item.quantity1 = input1Value;
        item.quantity2 = input2Value;
        this.setState(
          {
            cart: {
              items: [...items, item],
              total: this.state.cart.total + item.price1*input1Value + item.price2*input2Value,
            },
          },
          () => Cookie.set("cart", this.state.cart.items)
        );
      } else {
        this.setState(
          {
            cart: {
              items: this.state.cart.items.map((item) =>
                item.id === newItem.id
                  ? Object.assign({}, item, { quantity1: item.quantity1 + input1Value },{quantity2: item.quantity2 + input2Value})
                  : item
              ),
              total: this.state.cart.total + item.price1*input1Value + item.price2*input2Value,
            },
          },
          () => Cookie.set("cart", this.state.cart.items)
        );
      }
    };

    const removeItem = (item) => {
      let { items } = this.state.cart;
      console.log(items);
      const removeItem = items.find((i) => i.id === item.id);

      const itemList = [...this.state.cart.items];
      const index = items.findIndex((i) => i.id === removeItem.id);

      itemList.splice(index, 1);
      console.log(itemList);
      this.setState(
        { cart: { items: itemList, total: this.state.cart.total - removeItem.price1*removeItem.quantity1 - removeItem.price2*removeItem.quantity2 } },
        () => Cookie.set("cart", itemList)
      );
    };

    const clickCheckout = () =>{
      if(true){
        axios
          .post(process.env.REACT_APP_BACKEND_URL + '/orders', {
            status: "Checking",
            productList: Cookie.get('cart'),
            creator: Cookie.get('username'),
          },{
            headers: {
              'Authorization':'bearer '+ Cookie.get('token'),
            },
          })
          .then(response => {
            alert("Checkout success!");
            Cookie.remove('cart');
            this.setState({cart: {items:[], total:0}});
          })
          .catch(error => {
            // Handle error.
            alert('An error occurred, please check again.');
            console.log('An error occurred:', error.response);
          });
        return;
      }
    }

    const clickBuyButton = (productId) =>{
      let display = document.getElementsByClassName("form-for-" + productId)[0].style.display;
      if(display === '' || display ==='none' ){
        document.getElementsByClassName("form-for-" + productId)[0].style.display = "block";
        return;
      }
      document.getElementsByClassName("form-for-" + productId)[0].style.display = "none";
    }

    const clickCloseCartpanel = () =>{
      document.getElementsByClassName('cart-panel')[0].style.display = 'none';
      document.getElementsByClassName('cart-show')[0].style.display = 'block';
    }

    const clickCartShow = () =>{
      document.getElementsByClassName('cart-panel')[0].style.display = 'flex';
      document.getElementsByClassName('cart-show')[0].style.display = 'none';
    }

    const clickCartCancle = () =>{
      Cookie.remove('cart');
      this.setState({cart: {items:[],total:0}});
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="ProductList">
          <h2 className="ProductList-title">Available Products ({this.state.products.length})</h2>
          <div className="ProductList-container">
            {this.state.products.map((product, index) => {
              let formClassName = "form-group form-for-" + product.id;
              let inputClassName1 = "form-control input1-for-" + product.id;
              let inputClassName2 = "form-control input2-for-" + product.id;
              return (
                <div className="ProductList-product" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.name}</h3>
                  </Link>

                    <h6>Loại: {product.category.name}</h6>
                    <p>{product.description}</p>
                    <p>Giá (1m) :{product.price}</p>
                    <p>Giá (1 cuộn) :{product.price2}</p>

                  <button onClick={()=>clickBuyButton(product.id)}
                  className="btn btn-primary"> Mua </button>
                  <form className={formClassName} onSubmit={(e)=>{e.preventDefault();
                  addItem({id:product.id, name:product.name,
                  price1:Number(product.price),price2:Number(product.price2)})}}>
                    <div className="row">
                      <div className="col-lg-4">
                        <input className={inputClassName1} type="number" placeholder="số mét"/>
                      </div>
                      <div className="col-lg-4">
                        <input className={inputClassName2} type="number" placeholder="số cuộn"/>
                      </div>
                      <div className="col-lg-1">
                        <input className="btn btn-primary" type="submit" value="Xác nhận"/>
                      </div>
                      <div className="col-lg-1">
                        <input className="btn btn-primary reset-btn" type="reset" value="Reset"/>
                      </div>
                    </div>
                  </form>
                </div>
              );
            })}
          </div>
          
          <div className="cart">
            <div className="cart-show" >
              <button className="btn btn-warning" onClick={clickCartShow}>SHOW CART ({this.state.cart.items.length})</button>
            </div>

            <div className="cart-panel">
              <div className="cart-panel-top">
                <button className="btn btn-warning" onClick={clickCloseCartpanel}>x</button>
              </div>
              <div className="cart-panel-body">
                <div className="cart-item-list">
                  {this.state.cart.items.map((item, index)=>{
                    return(
                      <div className="cart-item" key={index}>
                        <div className="item-name">{item.name}:</div>
                        <div className="item-quantity1">{item.quantity1}x mét </div>
                        <div className="item-quantity1">{item.quantity2}x cuộn </div>
                        <div className="item-btn"><button onClick={()=>{removeItem({id:item.id, price1: Number(item.price),price2: Number(item.price2)})}}
                        className="btn btn-success"> Remove </button></div>
                      </div>
                    )
                  })}
                </div>
                <strong>Total : </strong>{this.state.cart.total} <br/>
                <button className="btn btn-primary" onClick={clickCheckout}>Check out!</button>
                <button className="btn btn-primary" onClick={clickCartCancle}>Cancle</button>
              </div>
            </div>
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
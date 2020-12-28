import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

class ProductCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      category:{},
      product: {name: "",
                description: "",
                category: "kaki",
                price1: "",
                price2: "",
      },
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/product-categories/5fd772c4d978b74bfc8bc2a8",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let data = await response.json();
      this.setState({ loading: false, authenticate: true, category:data });
      return
    }
    this.setState({authenticate: false});
  }

  render() {
    const clickSubmit = (event) =>{
      event.preventDefault();
      if(Number(this.state.product.price1) < 1 && Number(this.state.product.price2) < 1){
        alert("You must input at least 1 price value");
        return
      }
      axios
        .post(process.env.REACT_APP_BACKEND_URL + '/products/', {
          description: this.state.product.description,
          name: this.state.product.name,
          category: this.state.category,
          price: this.state.product.price1,
          price2: this.state.product.price2,
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

    const clickBack = (event) =>{
      event.preventDefault();
      window.location.href = "/admin/products";
    }

    const handleChangeCategory = async (categoryName) =>{
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + '/product-categories?name=' + categoryName ,{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return;
      }
      let data = await response.json();
      console.log(data[0]);
      this.setState({ category: data[0] });
    }


    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="container">

        <div className="row">

            <div className="col-xl-8 offset-xl-2">

                <h1 style={{fontSize: 50+'px'}}>Product Create</h1>


                <form id="contact-form" onSubmit={clickSubmit}>

                    <div className="messages"></div>

                    <div className="controls">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_name">Name :</label>
                                    <input id="form_name" type="text" className="form-control" value={this.state.product.name} required="required"
                                        data-error="Name is required." onChange={(e)=>this.setState({product:{...this.state.product,name:e.target.value}})} />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_description">Description :</label>
                                    <input id="form_description" type="text" className="form-control" value={this.state.product.description} required="required"
                                        data-error="Description is required." onChange={(e)=>this.setState({product:{...this.state.product,description:e.target.value}})}/>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Price (1m) :</label>
                                    <input type="number" className="form-control" value={this.state.product.price1}
                                        onChange={(e)=>this.setState({product:{...this.state.product,price1:e.target.value}})} />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>Price (1 cuộn) :</label>
                                    <input type="number" className="form-control" value={this.state.product.price2}
                                        onChange={(e)=>this.setState({product:{...this.state.product,price2:e.target.value}})} />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_category">Category :</label>
                                    <select id="form_category" className="form-control" value={this.state.category.name} 
                                     onChange={(e)=>handleChangeCategory(e.target.value)}>
                                        <option value="cotton"> cotton</option>
                                        <option value="kaki"> kaki</option>
                                        <option value="kate"> kate</option>
                                        <option value="jean"> jean</option>
                                        <option value="denim"> denim</option>
                                    </select>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>

                        <div id="result" style={{color:"red"}}>
                        </div>

                        <input type="submit" className="btn btn-primary" value="Create" />
                        <button className="btn btn-primary" onClick={(e)=>clickBack(e)} style={{marginLeft: 30+'px'}} > Back</button>
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

export default ProductCreate;
import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

class OrderUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      list: [],
      order: {},
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/orders/" + this.props.match.params.id,{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let data = await response.json();
      let list = JSON.parse(data.productList);
      this.setState({ loading: false, authenticate: true, order: data, list: list});
      Cookie.set('list',list);
      return
    }
    this.setState({authenticate: false});
  }

  render() {
    const clickSubmit = (event) =>{
      event.preventDefault();
      axios
        .put(process.env.REACT_APP_BACKEND_URL + '/orders/' + this.state.order.id, {
            status: this.state.order.status,
            productList: Cookie.get('list')
        },{
            headers: {
                'Authorization':'bearer '+ Cookie.get('token'),
            },
        })
        .then(response => {
            alert('Update success.');
            window.location.href = '/admin/orders'
        })
        .catch(error => {
            alert('Update failed !!!');
            console.log('An error occurred:', error.response);
        });
      return;
    }

    const clickBack = (event) =>{
      event.preventDefault();
      window.location.href = "/admin/orders";
    }

    const removeItem = (id,event) => {
        event.preventDefault();
        let list = this.state.list;
        const index = list.findIndex((i) => i.id === id);
        
        list.splice(index, 1);
        document.getElementsByClassName("remove-"+id)[0].setAttribute('disabled',true);
        document.getElementsByClassName("remove-"+id)[0].innerHTML = "Removed";
        Cookie.set('list',list);
        this.setState({list:list});
      };


    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="container">

        <div className="row">

            <div className="col-xl-8 offset-xl-2">

                <h1 style={{fontSize: 50+'px'}}>Order Update</h1>


                <form id="contact-form" onSubmit={clickSubmit}>

                    <div className="messages"></div>

                    <div className="controls">
                      <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="form_status">Status :</label>
                                    <select id="form_status" className="form-control" value={this.state.order.status} 
                                     onChange={(e)=>this.setState({order:{...this.state.order,status:e.target.value}})}>
                                        <option value="checking"> checking</option>
                                        <option value="delivering"> delivering</option>
                                        <option value="deliveried"> deliveried</option>
                                    </select>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="form-group">
                                    <label>Product List :</label>
                                    {JSON.parse(this.state.order.productList).map((item, index)=>{
                                        return(
                                        <div className="cart-item" key={index}>
                                            {item.name + " : " + item.quantity1 +" mét ," + item.quantity2 +" cuộn."}
                                            <button onClick={(e)=>{removeItem(item.id,e)}}
                                            className={"btn btn-success remove-"+item.id}> Remove </button>
                                        </div>
                                        )
                                    })}
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>

                        <div id="result" style={{color:"red"}}>
                        </div>

                        <input type="submit" className="btn btn-primary" value="Save" />
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

export default OrderUpdate;
import React, { Component } from 'react';
import Cookie from "js-cookie";
import axios from "axios";

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      authenticate: true,
      orders: []
    }
  }

  async componentDidMount() {
    if(Cookie.get('role') === 'Admin'){     
      let response = await fetch(process.env.REACT_APP_BACKEND_URL + "/orders",{
        headers: {
          'Authorization':'bearer '+ Cookie.get('token'),
        },
      });
      if (!response.ok) {
        return
      }
      let orders = await response.json();
      this.setState({ loading: false,authenticate: true, orders: orders });
      return
    }
    this.setState({authenticate: false});
  }

  filterSubmmitHandle(){

  }


  render() {
    const clickInfo = (id) =>{
      window.location.href = "/admin/order/" + id;
    }

    const clickUpdate = (id) =>{
      window.location.href = "/admin/order/" + id + "/update";
    }

    const clickDestroy = (id) =>{
      axios
        .delete(process.env.REACT_APP_BACKEND_URL + "/orders/" + id,{
          headers: {
            'Authorization':'bearer '+ Cookie.get('token'),
          },
        })
        .then(response => {
          alert('Destroy success.');
          window.location.href = "/admin/orders"
        })
        .catch(error => {
          // Handle error.
          alert('Destroy failed !!!');
          console.log('An error occurred:', error.response);
        });
    }

    if (!this.state.loading && Cookie.get('token')) {
      return (
        <div className="DataList">
          <h2 className="DataList-title">Orders ({this.state.orders.length})</h2>
          <div className="DataList-container">
            
            <div className="DataList-filter" onSubmit={this.filterSubmmitHandle}>
              <form className="form-inline w-100">
                <input className="form-control" name="status_filter" type="text" placeholder="Tìm kiếm Theo status"/>
              </form>
            </div>

            <table className="table">
              <thead>
              <tr>
                  <th>ID</th>
                  <th>Creator</th>
                  <th>Status</th>
                  <th>productList</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
                {this.state.orders.map((order, index) => {
                  return (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.creator}</td>
                      <td>{order.status}</td>
                      <td>
                        {JSON.parse(order.productList).map((item,index)=>{
                            if(index === 2)
                                return(<p key={item.id}>...</p>);
                            if(index === 3)
                                return(<></>);
                            return(
                                <p key={item.id}>{item.name +" : " + item.quantity1 + " m," + item.quantity2 + " cuộn."}</p>
                            )
                        })}
                      </td>
                      <td>
                      <div className="dropdown">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                          Select
                        </button>
                        <div className="dropdown-menu">
                          <button className="dropdown-item" onClick={() =>clickInfo(order.id)} >More Info</button>
                          <button className="dropdown-item" onClick={() =>clickUpdate(order.id)} >Update</button>
                          <button className="dropdown-item" onClick={() =>clickDestroy(order.id)} >Destroy</button>
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

export default OrderList;
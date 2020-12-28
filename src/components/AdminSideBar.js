
const AdminSideBar = () =>{
    return(
        <div className="SideBar">
            <div className="Group-name">
                <a href="/admin">Dashboard</a>
            </div>
            <div className="Group-name">
                Data manager
            </div>
            <div className="Group-items">
                <a href="/admin/accounts">Accounts</a>
                <a href="/admin/products">Products</a>
                <a href="/admin/orders">Orders</a>
            </div>
            <div className="Group-name">
                More
            </div>
            <div className="Group-items">
                <a href="/adminDashboard">More 1</a>
                <a href="/adminDashboard">More 2</a>
            </div>
        </div>
    );
};

export default AdminSideBar;
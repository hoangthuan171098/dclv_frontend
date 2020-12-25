
const AdminSideBar = () =>{
    return(
        <div className="SideBar">
            <div className="Group-name">
                account manager
            </div>
            <div className="Group-items">
                <a href="/admin">Dashboard</a>
                <a href="/admin/accounts">accountList</a>
            </div>
            <div className="Group-name">
                setting
            </div>
            <div className="Group-items">
                <a href="/adminDashboard">setting 1</a>
                <a href="/adminDashboard">setting 2</a>
            </div>
        </div>
    );
};

export default AdminSideBar;
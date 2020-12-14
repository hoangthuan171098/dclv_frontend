import Cookie from "js-cookie";


export default function Logout(){
    Cookie.remove("token");
    Cookie.remove("username");
    Cookie.remove("role");
    window.location.href = "/login";
}
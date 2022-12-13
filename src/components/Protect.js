import { Navigate } from "react-router-dom";

function Protect(props){
    
    let login= localStorage.getItem("notflix_token");
    console.log(login)
    return login!==null? props.children:<Navigate to="/Login"/>

}

export default Protect;
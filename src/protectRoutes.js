import { useEffect,useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Login } from "./pages/login/login";
export function ProtectRoute(){
    const navigate=useNavigate();
    const[isloggedin,setisloggedin]=useState(false)
    const checkUserToken=()=>{
        const userToken=localStorage.getItem("user-token")
        if(!userToken||userToken==="undefined"){
            setisloggedin(false)
            alert("please log in first without login you cannot enter into this page");
            return navigate("/")
        }
        setisloggedin(true)
    }
    useEffect(()=>{
       checkUserToken();
    },[isloggedin])
    return(
  
        isloggedin ? <Outlet/> :<Login/>
    
 
    )
}
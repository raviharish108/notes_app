import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { url } from "../../backendurl/url"
import { useDispatch } from "react-redux";
import { loginFailure,loginStart,loginSuccess} from "../../redux/user";
export function Login(){
    const[email,setemail]=useState("")
    const[password,setpassword]=useState("")
    const[busy,setbusy]=useState(false)
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const user={
        "email":email,
       "password":password
       } 
       const login=async()=>{
        try{
          loginStart();
       await setbusy(true)
       const response= await axios.post(`${url}/api/user/login`,user);
       const token=await response.data.token;
       if(!token){
        alert('Unable to login. Please try after some time.');
       }
       await localStorage.clear();
       await localStorage.setItem('user-token', token);
       await dispatch(loginSuccess(response.data.username));
       await navigate("/home");
       }catch(err){
        await setbusy(false)
        await dispatch(loginFailure());
        alert("invalid credentials")

    }
}
       if(busy){
        return(
          <div>
            connecting...
          </div>
        )
      } 
    return(
                <div className="login_container">
                <h2>Login</h2>
                 <form>
                    <div className="row">
                        <label for="username">username</label>
                        <input id="username" type="text" onChange={(e)=>{
               setemail(e.target.value);
          }}/> 
                    </div>
                    <div className="row">
                        <label for="password">password</label>
                        <input id="password" type="password" onChange={(e)=>{
            setpassword(e.target.value)
          }}/> 
                    </div>
                    <button type="submit" onClick={()=>{
                  login()}}>Login</button>
                    <button type="submit"><Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>Register Now</Link></button>
                    <button type="submit"><Link to="/forgot" style={{ textDecoration: 'none', color: 'blue' }}>Forgot Password</Link></button>
                 </form>
             </div>
    )
}


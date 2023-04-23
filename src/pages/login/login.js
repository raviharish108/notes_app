import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { url } from "../../backendurl/url"
import { useDispatch } from "react-redux";
import { loginFailure,loginStart,loginSuccess} from "../../redux/user";
import { useFormik } from 'formik';
import * as Yup from 'yup';
export function Login(){
   
    const[busy,setbusy]=useState(false)
    const navigate=useNavigate();
    const dispatch=useDispatch()
   
    const formik = useFormik({
        initialValues: {
          username:'',
          password:'',
        },
        validationSchema: Yup.object({
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('specify username'),
          password: Yup.string()
            .min(6,'must be 6 characters and above')
            .required('specify your password'),
        }),
        onSubmit: values => {
          login(values)
        },
      });
       const login=async(value)=>{
        try{
          loginStart();
       await setbusy(true)
       const response= await axios.post(`${url}/api/user/login`,value);
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
                 <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <label for="username">username</label>
                        <input id="username" type="text" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.username} /> 
                        {formik.touched.username && formik.errors.username ? ( <div>{formik.errors.username}</div> ) : null} 
                    </div>
                    <div className="row">
                        <label for="password">password</label>
                        <input id="password" type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.password}/> 
                        {formik.touched.password && formik.errors.password ? ( <div>{formik.errors.password}</div>) : null}                   
                     </div>
                    <button type="submit">Login</button>
                   </form>
                    <button type="submit"><Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>Register Now</Link></button>
                    <button type="submit"><Link to="/forgot" style={{ textDecoration: 'none', color: 'blue' }}>Forgot Password</Link></button>
                
             </div>
    )
}


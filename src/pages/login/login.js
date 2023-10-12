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
          email:'',
          password:'',
        },
        validationSchema: Yup.object({
              email: Yup.string()
              .email('Invalid email address')
              .required('specify your email id'),
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
       await loginStart()
       await setbusy(true);
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
        console.log(err.response);
        await setbusy(false)
        await dispatch(loginFailure());
        alert("invalid credentials")

    }
}

    return(
                <div className="login_container">
                <h2>Login</h2>
                 <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <label for="email">username</label>
                        <input id="email" type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email} /> 
                        {formik.touched.email && formik.errors.email ? ( <div>{formik.errors.email}</div> ) : null} 
                    </div>
                    <div className="row">
                        <label for="password">password</label>
                        <input id="password" type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.password}/> 
                        {formik.touched.password && formik.errors.password ? ( <div>{formik.errors.password}</div>) : null}                   
                     </div>
                    <button type="submit"  >{busy?"loading....":"login"}</button>
                   </form>
                    <button type="submit"><Link to="/register" style={{ textDecoration: 'none',color:"black"}}>Register Now</Link></button>
                    <button type="submit"><Link to="/forgot" style={{ textDecoration: 'none',color:"black" }}>Forgot Password</Link></button>
                
             </div>
    )
}


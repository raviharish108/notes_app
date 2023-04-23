import {useState} from "react"
import { url } from "../../backendurl/url";
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
export function Forgot() {
   
    const [busy,setbusy]=useState(false)
 const formik = useFormik({
        initialValues: {
          email:'',
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email('invalid email address ')
            .required('specify your email address'),
        }),
        onSubmit: values => {
          submit(values)
        },
      });
   const submit=async(value)=>{
    try{
       setbusy(true);
       const result= await axios.post(`${url}/api/user/forgot`,value);
       await alert(result.data.msg);
        await setbusy(false)
        }catch(err){
            await alert(err.response.data.msg);
            await setbusy(false);
            
        }
       }
if(busy){
    return(
        <div>
            loading...
        </div>
    )
}
    return (
        <div className="login_container">
            <h2>Forgot Password</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="row">
                    <label for="email">email</label>
                    <input id="email" type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email} />
                </div>
                {formik.touched.email && formik.errors.email ? ( <div>{formik.errors.email}</div>) : null} 
                <button type="submit">Submitt</button>
            </form>
                
        </div>
    );
}

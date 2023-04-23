import { url } from "../../backendurl/url";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export function Register() {
    
    const [busy, setbusy] = useState(false);
    const navigate = useNavigate();
    const [msg, setmsg] = useState(false);
    const formik = useFormik({
        initialValues: {
          username:'',
          email:'',
          password:'',
        },
        validationSchema: Yup.object({
          username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('specify username'),
            email:Yup.string()
            .required('specify email')
            .email("invalid email address"),
            password: Yup.string()
            .min(6,'must be 6 characters and above')
            .required('specify your password'),
        }),
        onSubmit: values => {
          submit(values)
        },
      });
    const submit = async (value) => {
        try {
            await setbusy(true);
            await axios.post(`${url}/api/user/signup`, value);
            await setbusy(false);
            await alert("successfully registered");
            await navigate("/");
        } catch (err) {
            await setbusy(false);
            await console.log(err);
            await alert(err.response.data.msg);
            await setmsg(err.response.data.msg);
        }
    };
    if (busy) {
        return (
            <div>
                loading...
            </div>
        );
    }
    return (
        <div className="login_container">
            <h2>Register</h2>
            <div>{msg}</div>
             <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <label for="username">username</label>
                <input id="username" type="text" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.username} />
            </div>
            {formik.touched.username && formik.errors.username ? ( <div>{formik.errors.username}</div> ) : null}
            <div className="row">
                <label for="email">email</label>
                <input id="email" type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.email}/>
            </div>
            {formik.touched.email && formik.errors.email ? ( <div>{formik.errors.email}</div> ) : null}
            <div className="row">
                <label for="password">password</label>
                <input id="password" type="password"  name="password" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.password}/>
            </div>
            {formik.touched.password && formik.errors.password ? ( <div>{formik.errors.password}</div> ) : null}
            <button type="submit">Register</button>
            </form>
            <button type="submit"><Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>LogIn</Link></button>

        </div>
    );
}

import { url } from "../../backendurl/url";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";


export function Register() {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [busy, setbusy] = useState(false);
    const navigate = useNavigate();
    const [msg, setmsg] = useState(false);
    const newuser = {
        "username": username,
        "email": email,
        "password": password
    };
    const submit = async () => {
        try {
            await setbusy(true);
            await axios.post(`${url}/api/user/signup`, newuser);
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

            <div className="row">
                <label for="username">username</label>
                <input id="username" type="text" onChange={(e) => {
                    e.preventDefault();
                    setusername(e.target.value);
                }} />
            </div>
            <div className="row">
                <label for="email">email</label>
                <input id="email" type="email" onChange={(e) => {
                    e.preventDefault();
                    setemail(e.target.value);
                }} required />
            </div>
            <div className="row">
                <label for="password">password</label>
                <input id="password" type="password" onChange={(e) => {
                    e.preventDefault();
                    setpassword(e.target.value);
                }} required />
            </div>
            <button type="submit" onClick={() => submit()}>Register</button>
            <button type="submit"><Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>LogIn</Link></button>

        </div>
    );
}

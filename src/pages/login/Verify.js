import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { url } from "../../backendurl/url";

export function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    const [busy, setbusy] = useState(true);
    const verify = async () => {
        try {
            const {token} = await queryString.parse(location.search);
            if(!token){
                await alert ("token required")
                navigate("/register");
            }
            await axios.get(`${url}/api/user/verify?token=${token}`);
            await setbusy(false);
        }
        catch (err) {
            await alert(err.response.data.msg);
            navigate("/register");
        }
    };
    useEffect(() => {
        verify();
    }, []);
  const navigate1=useNavigate();
    const confirm=async()=>{
        try {
            await setbusy(true)
              const {token} = await queryString.parse(location.search);
             const data= await axios.post(`${url}/api/user/activate?token=${token}`);
             await alert(data.response.data.msg);
             await setbusy(false);
             await navigate1("/");
        }
        catch (err) {
            await setbusy(false);
            await alert(err.response.data.msg);
        }
    }
   
    if (busy) {
        return (
            <div>
                verifying......
            </div>
        );
    }
    return (
        <div className="login_container">
            <h2><button onClick={(e)=>{e.preventDefault();
                                    confirm()}}> to conform Email to click the button</button></h2>
            <button><Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>LogIn</Link></button>
        </div>
    );
}

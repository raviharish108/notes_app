import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { url } from "../../backendurl/url";

export function Changepassword() {
 const navigate = useNavigate();
    const location = useLocation();
    const[password,setpassword]=useState("")
  const[c_password,setC_password]=useState("")
    const [busy, setbusy] = useState(true);
    const navi1=(()=>{
        navigate("/forgot");
    })
    const verify = async () => {
        try {
            const {token,id} = await queryString.parse(location.search);
            if(!token||!id){
                await alert ("token  and id required ")
                await navi1();
            }
            await axios.get(`${url}/api/user/changepassword?token=${token}&id=${id}`);
            await setbusy(false);
        }
        catch (err) {
            await alert(err.response.data.msg);
            await navi1();
        }
    };
    useEffect(()=>{
        verify();
    },[]);

    const submitt=async()=>{
        try{
          await setbusy(true)
          const{token,id}=queryString.parse(location.search)
          if(password!==c_password){
          alert("password does not match")
          }
          if(password===c_password){
             const data=  await axios.post(`${url}/api/user/changepassword?token=${token}&id=${id}`,{password})
            await alert(data.response.data.msg);
          };
           await setbusy(false);
        }catch(err){
             await setbusy(false);
             await alert(err.response.data.msg)
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
            <h2>change Password</h2>
            <form>
                <div className="row">
                    <label for="password">password</label>
                    <input id="password" type="text" onChange={(e)=>{
        e.preventDefault()
        setpassword(e.target.value)
      }  }/>
                </div>
                <div className="row">
                    <label for="confirm_password">confirmation password</label>
                    <input id="confirm_password" type="password" onChange={(e)=>{
        e.preventDefault()
        setC_password(e.target.value)
      }  }/>
                </div>
                <button type="submit" onClick={(e)=>{e.preventDefault()
              submitt();
             
            }}>confirm</button>
              <button type="submit"><Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>LogIn</Link></button>
            </form>
        </div>
    );
}

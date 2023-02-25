import {useState} from "react"
import { url } from "../../backendurl/url";
import axios from "axios";

export function Forgot() {
    const[email,setemail]=useState("")
    const [busy,setbusy]=useState(false)

   const submit=async()=>{
    try{
       setbusy(true);
       const result= await axios.post(`${url}/api/user/forgot`,{"email":email});
       await alert(result.response.data.msg);
       await console.log(result);
        await setbusy(false)
        }catch(err){
            await alert(err.response.data.message);
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
                <div className="row">
                    <label for="email">email</label>
                    <input id="email" type="email" onChange={(e)=>{
                        setemail(e.target.value)
                    }} />
                </div>
                <button type="submit" onClick={(e)=>{
                                 e.preventDefault();
                                 submit(); } }>Submitt</button>
        </div>
    );
}

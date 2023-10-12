import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { url } from "../../backendurl/url";
export function Create(){
    const[title,settitle]=useState("")
    const[content,setcontent]=useState("")
    const[date,setdate]=useState();
    const[busy,setbusy]=useState(false)
    const navigate=useNavigate()
    const newnote={
        "title":title,
        "content":content,
        "date":date
    }
    const createNote = async()=>{
        try {
            setbusy(true)
            const token = localStorage.getItem('user-token');
            if(token){
               await axios.post(`${url}/api/notes/create`, newnote, {headers: {Authorization: token}});
            }
             navigate("/home");
        } catch (err) {
            setbusy(false);
            await alert(err.response.data.message);
        }
    }
    if(busy){
        return(
            <div>
                creating.....
            </div>
        )
    }
    return(
        <div className="createnote">
           <h2>Create Note</h2>
           <form>
            <div className="row">
                <label for="title">title</label>
                <input id="title" type="text" onChange={(e)=>{
                    settitle(e.target.value)
                }}/>
            </div>
            <div className="row">
                <label for="content">Content</label>
                <textarea id="content" type="text" onChange={(e)=>{
                    setcontent(e.target.value)
                }}/>
            </div>
            <label htmlFor="date">Date: {date} </label>
                <div className="row">
                    <input type="date" id="date"name="date"  onChange={(e)=>{
                        setdate(e.target.value);
                    }}/>
                </div>
            <button type="submit" onClick={(event)=>{
                event. preventDefault()
                createNote();
            }}>save</button>
           </form>
        </div>
    )
}
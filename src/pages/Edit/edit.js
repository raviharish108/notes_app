import { useState,useEffect } from "react"
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom"
import {url} from "../../backendurl/url";
export function Edit(){
    const [note, setNote] = useState({ title:'',content:''});
    const{id}=useParams();
    const navigate=useNavigate();
    const getnote=async()=>{
        try{
        const token = localStorage.getItem('user-token')
        if(id && token){
         const res = await axios.get(`${url}/api/notes/getonenote/${id}`,{headers:{Authorization: token}})
           await setNote({title: res.data.title, content: res.data.content,date:res.data.date});
          }
        }catch(err){
         await alert(err.response.data.message);
        }
        }
useEffect(()=>{
getnote();
},[id])
const onChangeInput = e => {
    const {name, value} = e.target;
    setNote({...note,[name]:value})
}
const {title, content,date} = note;
const updatedNote={title,content,date};
const editNote = async() =>{
    const token = localStorage.getItem('user-token');
    try {
        if(token){
            const result=await axios.put(`${url}/api/notes/updatenote/${id}`, updatedNote, {headers:{Authorization:token}})
        }
        navigate("/home");
    } catch (err) {
         await alert(err.response.data.message);
         await console.log(err);
    }
}
    return(
        <div className="createnote">
           <h2>Edit Note</h2>
           <form>
            <div className="row">
                <label for="title">title</label>
                <input id="title" type="text" name="title" value={note.title}  onChange={onChangeInput}/>
            </div>
            <div className="row">
                <label for="content">Content</label>
                <textarea id="content" type="text" name="content" value={note.content} onChange={onChangeInput}/>
            </div>
            <label htmlFor="date">Date: {new Date(note.date).toLocaleDateString()} </label>
                <div className="row">
                    <input type="date" id="date" name="date"  onChange={onChangeInput}/>
                </div>
            <button type="submit" onClick={(e)=>{ 
                          e.preventDefault();
                          editNote()}} >save</button>
           </form>
        </div>
    )
}
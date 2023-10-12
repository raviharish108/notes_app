
import { Link, useNavigate,  } from "react-router-dom"
import { url } from "../../backendurl/url"
import { useEffect,useState } from "react"
import axios from "axios"
let token = localStorage.getItem('user-token');
export function Home(){
    const [notes,setnotes]=useState([]);
   

    const delete_note=async(id)=>{
        await axios.delete(`${url}/api/notes/deletenote/${id}`,{headers: {Authorization: token}});
        await getnotes();
    }
   useEffect(()=>{
    const getnotes=async()=>{
        try{
       if(token){
       const result= await axios.get(`${url}/api/notes/getnotes`,{headers: {Authorization: token}})    
      const{data}=result;
      setnotes(data);
       }
   }catch(err){
           await alert(err.response.data.message);
         }
   }
       getnotes();
   },[]);
    return(
        <div className="note-wrapper">
        {notes.map((note,_id)=> <Note value={note} key={_id} deletebutton={ <button className="close" onClick={(()=>{delete_note(note._id)})}>X</button>}/>)}
        </div>
    )
}
function Note({value,deletebutton}){
    const navigate=useNavigate();
    return(
        <div className="card">
             <h4>{value.title}</h4>
             <div className="text-wrapper">
                <p>{value.content}</p>
             </div>
             <p className="date">{new Date(value.date).toLocaleDateString()}</p>
             <p className="card-footer"><button onClick={()=>navigate(`/edit/${value._id}`)}>Edit</button></p>
             {deletebutton} 
        </div>
    )
}
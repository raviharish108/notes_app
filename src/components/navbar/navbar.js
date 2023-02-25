import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/user";
import { useSelector } from "react-redux";
export function Navbar(){
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const logout = () => {
  localStorage.clear();
   dispatch(logOut());
  navigate('/');
} 
const { currentUser } = useSelector((state) => state.user);
    return(
      <div className="header">
        <div className="logo">
             <h1><Link>Notes App</Link></h1>
        </div>
          {currentUser &&
        <ul>
           <li><Link to="/home">{currentUser}</Link></li>
          <li><Link to="/home">Home</Link></li>    
          <li><Link to="/create" >Create Note</Link></li> 
          <li><Link to="/create" >Edit</Link></li> 
          <li><button onClick={()=>{
                 logout() }}>logout</button></li>
        </ul>}
      </div>
     
    )
  }
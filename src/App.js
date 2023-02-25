import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar/navbar';
import { Home } from './pages/home/home';
import { Create } from './pages/create/create';
import { Login } from './pages/login/login';
import { Register } from './pages/login/Register';
import { Forgot } from './pages/login/Forgot';
import { Changepassword } from './pages/login/Change_password';
import { Verify } from './pages/login/Verify';
import { ProtectRoute } from './protectRoutes';
import { Edit } from './pages/Edit/edit';
 function App() {
  return (
    <div className="notes-page">
      <Navbar />
      <Routes>
        <Route path="/verify" element={<Verify />} />
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        <Route path="/changepassword" element={<Changepassword/>}/>
        <Route element={<ProtectRoute/>}>
             <Route path="/home" element={<Home/>}/>
             <Route path="/create" element={<Create />} />
             <Route path="/edit/:id" element={<Edit />} />
         </Route>
      </Routes>
    </div>
  );
}
export default App;
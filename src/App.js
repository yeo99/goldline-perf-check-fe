// Common
import { Route, Routes } from 'react-router-dom'

import LoginHeader from "./components/LoginHeader/LoginHeader";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register"
import Main from './pages/MainPage/Main';
import Check from './pages/CheckPage/Check';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/main' element={<Main/>}></Route>
        <Route path='/main/check' element={<Check></Check>}></Route>
      </Routes>
    </div>
  );
}

export default App;

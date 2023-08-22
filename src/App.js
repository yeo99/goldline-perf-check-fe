// Common
import { Reset } from 'styled-reset'
import { Route, Routes } from 'react-router-dom'

import LoginHeader from "./components/LoginHeader/LoginHeader";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register"
import Main from './pages/MainPage/Main';

function App() {
  return (
    <div className="App">
      <Reset/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/main' element={<Main/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

// Common
import { Reset } from 'styled-reset'
import { Route, Routes } from 'react-router-dom'

import LoginHeader from "./components/LoginHeader/LoginHeader";
import Login from "./pages/LoginPage/Login";

function App() {
  return (
    <div className="App">
      <Reset/>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;

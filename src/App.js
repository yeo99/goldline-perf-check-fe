// Common
import { Reset } from 'styled-reset'

import LoginHeader from "./components/LoginHeader/LoginHeader";

function App() {
  return (
    <div className="App">
      <Reset/>
      <LoginHeader></LoginHeader>
    </div>
  );
}

export default App;

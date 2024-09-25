import { BrowserRouter, Routes, Route } from "react-router-dom";
import Medicacao from './pages/Medicacao'
import './App.css';
import Remedio from './pages/Remedio';
import Home from "./pages/Home";
import Localizacao from "./pages/Localizacao";

function App() {

   return (
    <BrowserRouter>
      <Routes>
          <Route  index element={<Home/>} />
          <Route path="/remedio" element={<Remedio/>} />
          <Route path="/medicacoes" element={<Medicacao/>} />
          <Route path="/localizacao" element={<Localizacao/>} />
          <Route path="*" element={() => <h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  ); 
}

export default App;

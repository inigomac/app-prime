import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './pages/login/Login';
import { Gestor } from './pages/gestor/Gestor';
import { Inicio } from './pages/Inicio/Inicio';
import { Registro } from './pages/registro/Registro';

function App() {

  // react-router
  // 
  // @hooks {BrowserRouter , Routes , Route}
  // 
  // @Route {/} cargamos el componente Registro
  // @Route {/login} cargamos el componente login
  // @Route {/gestor} cargamos el componente gestor
  // @Route {/inicio} cargamos el componente inicio


  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path='/' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/gestor' element={<Gestor />} />
          <Route path='/inicio' element={ <Inicio /> } />          
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

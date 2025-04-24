import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Home from './Home';
import Toolbar from './commons/Toolbar';
import Provincias from './provincias/Provincias';
import Ciudades from './ciudades/Ciudades';
import Publicaciones from './publicaciones/Publicacion';
import Usuarios from './usuarios/usuarios';
import SobreNosotros from './SobreNosotros';

createRoot (document.getElementById('root')!).render(
  <>
  {/* Browser Router es el componente padre que tiene que envolver a todo lo que queramos que sea navegable */}
   <BrowserRouter>
   {/* Como necesitamos que la toolbar sea visible en todas las pantallas, tiene que envolver a todas las rutas 
   y estar dentro de browser routerpara ejecutar sus navegaciones */}
   <Toolbar>
    {/*Routes englobará todas las rutas navegables de nuestra aplicación*/}
    <Routes>
      {/*En cada route definiremos el path mediante el cual se podrá redirigir a el compononque que queramos
      en cada caso y que estará definido en element*/}
     <Route path='/' element={<Home /> } />
     <Route path='/provincias' element= {<Provincias/>} />
     <Route path='/ciudades/:prov' element={<Ciudades/>}/>
     <Route path='/publicacion/:ciudad' element={<Publicaciones/>} />
     <Route path='/usuarios' element={<Usuarios/>} />
     <Route path='/sobrenosotros' element={<SobreNosotros />} />
    </Routes>
    </Toolbar>
   </BrowserRouter>
  </>
);
import logoIg from './assets/logos/Logo-Insta.png';
import logoX from './assets/logos/Logo-Twitter.png';
import logoPin from './assets/logos/Logo-Pinterest.png';
import logoCont from './assets/logos/Logo-Contacto.png';
import './Home.css';

function Home() {
  return(
    <div className='main-nav'>
      <p>Destinos</p>
      <button>Sobre nosotros</button>
      <p>|</p>
      <div className= 'nav-icons'>
        <img src={logoIg}/>
        <img src={logoX}/>
        <img src={logoPin}/>
        <img src={logoCont}/>
      </div>
    </div>
  );
}

export default Home;
import './SobreNosotros.css'

const SobreNosotros = () => {
    return (<>        
        <div className='section'>
            <p className='section-title'>Sobre Nosotros</p>
        </div>
        <div className="lexa-wrapper">
          <div className="lexa-main-image">
            <img src="/sobrenosotros/sobrenosotros.jpg" alt="Lexa en el coche" />
          </div>
    
          <div className="lexa-content">
            <div className="lexa-text">
              <p>
                ¡Hola! Mi nombre es Lexa, tengo 4 años y me encanta viajar. Somos
                una familia de 4 pero a mi hermano gatuno no le gusta salir de casa.
                Se nos ocurrió crear esta página para hacer ver a las familias que es
                posible viajar con sus mascotas e intentar bajar el porcentaje de
                abandono de animales en la época de vacaciones.
              </p>
              <p>
                En esta página encontrarás las distintas provincias y ciudades de
                España donde Lexa ha viajado y donde se ha podido hospedar y pasear
                sin tener que quedarse en casa.
              </p>
            </div>
    
            <div className="lexa-gallery">
              <img src="/sobrenosotros/sobrenosotros2.jpg" alt="Lexa en la playa" />
              <img src="/sobrenosotros/sobrenosotros3.jpg" alt="Lexa en la montaña" />
              <img src="/sobrenosotros/sobrenosotros4.jpg" alt="Lexa con paisaje" />
            </div>
          </div>
        </div>
    </>);
}

export default SobreNosotros;
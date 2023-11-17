import react from 'react';
import integrantesJson from '../components/data/integrante.json'
function Integrantes() {
 

    return (
        <div style={{fontFamily:'cascadia code'}}>
            <h1>Participantes</h1>
            <ul>
                {integrantesJson.map((integrante, index) => (
                    <li key={index}>
                        <div>
                            <img src={`/imgIntegrantes/${integrante.img}.jpg`} style={{width: '200px',height: '200px', borderRadius:'70%'}}></img>
                        </div>
                        <div>
                            <strong>Nombre: {integrante.nombre}</strong> 
                        </div>
                        <div>
                            <strong>Apellido: {integrante.apellido}</strong> 
                        </div>
                        <div>
                            <strong>DNI: {integrante.dni}</strong> 
                        </div>
                        <div>
                            <strong>Lu: {integrante.Lu}</strong> 
                        </div>
                        <div>
                            <strong>Cargos del proyecto: {integrante.proyecto}</strong> 
                        </div>
                        <div>
                            <a href={integrante.link}>Perfil de GITHUB</a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Integrantes;
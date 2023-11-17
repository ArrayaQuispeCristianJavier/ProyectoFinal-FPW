//exportamos el componente BrowserRouter, una ruta y un link
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Productos from './components/Producto';
import JuegoNave from './components/AppNave';
import Integrantes from './components/Integrantes';
import JuegoAnimal from './components/AppAnimales';
function App() {
    /*El componente ruteador que contiene el componente rutas y describe cada una de ellas osea de las rutas*/
    return (
        <Router>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container  style={{fontFamily:'minecraft'}}>
                    <Navbar.Brand href="#home" style={{cursor: 'default'}}>Grupo 10</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/comparadorPrecio">Comparador Precio</Nav.Link>
                            <Nav.Link href="/dude">Dude</Nav.Link>
                            <Nav.Link href="/juegoNave">Nave espacial</Nav.Link>
                            <Nav.Link href="/listaTarea">Lista de tarea</Nav.Link>
                            <Nav.Link href="/juegoAnimales">Juego para ninos</Nav.Link>
                            <Nav.Link href="/Integrantes">Integrantes</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='comparadorPrecio' element={<Productos />} />
                <Route path='juegoNave' element={<JuegoNave />} />
                <Route path='juegoAnimales' element={<JuegoAnimal />} />
                <Route path ='Integrantes' element={<Integrantes />}/>
            </Routes>
        </Router>
    )
}
export default App;
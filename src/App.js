//exportamos el componente BrowserRouter, una ruta y un link
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Productos from './components/Producto';
function App() {
    /*El componente ruteador que contiene el componente rutas y describe cada una de ellas osea de las rutas*/
    return (
        <Router>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Grupo 10</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/comparadorPrecio">Comparador de precio</Nav.Link>
                            <Nav.Link href="/dude">Dude</Nav.Link>
                            <Nav.Link href="/naveEspacial">Nave espacial</Nav.Link>
                            <Nav.Link href="/listaTarea">Lista de tarea</Nav.Link>
                            <Nav.Link href="/juegoNino">Juego para ninos</Nav.Link>
                            <Nav.Link href="/integrantes">Integrantes</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path='comparadorPrecio' element={<Productos/>}/>          
            </Routes>
        </Router>
    )
}
export default App;
//exportamos el componente BrowserRouter, una ruta y un link
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
                            <Nav.Link href="tp1">Trabajo practico 1</Nav.Link>
                            <Nav.Link href="tp2">Trabajo practico 2</Nav.Link>
                            <Nav.Link href="tp3">Trabajo practico 3</Nav.Link>
                            <Nav.Link href="tp4">Integrantes</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                {/* <Route path='tp1' element={}/> */}
                {/* <Route></Route>
                <Route></Route> */}
            </Routes>
        </Router>
    )
}
export default App;
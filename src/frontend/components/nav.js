import { Link } from "react-router-dom";
import { Button, Navbar, Nav, Container } from 'react-bootstrap'


const Navigation = ({Shop, Account}) => {

    return (
        <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    {/* <img src={logo} width="40" height="40" className="" alt="" /> */}
                    &nbsp; Lucky
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link as={Link} to="/"> Shop </Nav.Link>
                    <Nav.Link as={Link} to="/Account"> Account </Nav.Link>    
                    </Nav>
                    <Nav>

                    <Nav.Link
                               
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button nav-button btn-sm mx-4">

                                <Button variant="outline-light"
                                >
                                    Login
                                </Button>
                                </Nav.Link>
                  
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;
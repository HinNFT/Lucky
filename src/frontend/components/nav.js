import { Link } from "react-router-dom";
import { Button, Navbar, Nav, Container } from 'react-bootstrap'


const Navigation = ({Mint, Account, Home, openLogin , loginData}) => {

    return (
        <Navbar className ="py-4"expand="lg" bg="black" variant="dark" >

         <Navbar.Brand className = "navbar-brand" href="/">
                LUCKY
                </Navbar.Brand>

            <Container>
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link as={Link} color="white" to="/"> HOME </Nav.Link>
                    <Nav.Link as={Link} to="/Mint"> MINT </Nav.Link>
                    <Nav.Link as={Link} to="/Account"> ACCOUNT </Nav.Link>    
                    </Nav>

                    <Nav>
                    <Nav.Link as={Link} onClick = {openLogin}> REGISTER </Nav.Link> 
                    <Nav.Link as={Link}  onClick = {openLogin} className ="loginButton"> LOGIN </Nav.Link>    
                    
                  
                        
                    </Nav>

                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;


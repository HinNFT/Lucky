import { Link } from "react-router-dom";
import { Button, Navbar, Nav, Container } from 'react-bootstrap'


const Navigation = ({Mint, Account, Home, openLogin , loginData}) => {

    return (
        <Navbar className ="py-4"expand="lg" bg="black" variant="dark" >

        

            <Container>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                 <Navbar.Brand className = "navbar-brand" href="/">
                LUCKY
                </Navbar.Brand>
                
                    <Nav className="me-auto">
                    <Nav.Link as={Link} href="https://www.lucky.boo"> HOME </Nav.Link>  
                    <Nav.Link as={Link} to="/"> MINT </Nav.Link>
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


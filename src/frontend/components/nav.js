import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'


const Navigation = ({Mint, Home, openLogin , loginData, login}) => {

    return (
        <Navbar className ="py-4"expand="lg" bg="black" variant="dark" >

        

            <Container>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                 <Navbar.Brand className = "navbar-brand" href="/">
                LUCKY
                </Navbar.Brand>
                
                    <Nav className="me-auto">
                    <Nav.Link ><a className ="home-link" href="https://www.lucky.boo"> HOME </a>  </Nav.Link>
                    <Nav.Link as={Link} to="/"> MINT </Nav.Link>
                    <Nav.Link ><a className ="home-link" href="https://user.lucky.boo"> REFERRALS </a>  </Nav.Link>

                    </Nav>

                    
                    {login ? (<p className="acc">{loginData.email}</p>) : (<Nav>
                    <Nav.Link as={Link} onClick = {openLogin}> REGISTER </Nav.Link> 
                    <Nav.Link as={Link}  onClick = {openLogin} className ="loginButton"> LOGIN </Nav.Link>    
                    </Nav>)}
                    

                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;


import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron} from 'reactstrap';
import '../App.css'; 

class Header extends Component{
    
    render() {
        return (
            <React.Fragment>
            <Navbar dark>
                <div className="conatiner">
                    <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                </div>
            </Navbar>
            <Jumbotron>
                <div className="container">
                    <div className="row row-header">
                        <h1>Ristorante Con Fusion</h1>
                        <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. OUr lipsmacking creation will tickle your cullinary senses.</p>
                    </div>
                </div>
            </Jumbotron>
            </React.Fragment>
        )
    }
}

export default Header;
import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import DishDetail from './DishDetailComponent.js'
import Menu from './MenuComponent.js';
import { DISHES } from '../shared/dishes.js';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }

    render() {
        return (
            <div className="App">
                <Navbar dark color="primary">
                    <div className="conatiner">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={ this.state.dishes } onClick={(dishId) => this.onDishSelect(dishId)}/>
                <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
            </div>
        );
    }
}

export default Main;
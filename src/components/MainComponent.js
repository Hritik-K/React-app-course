import React, {Component} from 'react';
import DishDetail from './DishDetailComponent.js'
import Menu from './MenuComponent.js';
import { DISHES } from '../shared/dishes.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js'

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
                <Header/>
                <Menu dishes={ this.state.dishes } onClick={(dishId) => this.onDishSelect(dishId)}/>
                <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}/>
                <Footer/>
            </div>
        );
    }
}

export default Main;
import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Home from './HomeComponent';
import DishDetail from './DishDetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent.js';
import {connect} from 'react-redux';
import {addComment, fetchDishes} from '../redux/ActionCreators';

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())}
});

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        comments: state.comments,
        promotions: state.promotions
    }
}


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
    }

    render() {
        
        const HomePage = () => {
            return (
                <Home 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
                    dishesLoading={this.props.dishes.isLoading} 
                    dishesErrMess={this.props.dishes.ErrMess} 
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]} 
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
            );
        }
    
        const DishWithId = ({match}) => {
            return (
                <DishDetail 
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                    isLoading={this.props.dishes.isLoading} 
                    errMess={this.props.dishes.ErrMess} 
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} addComment={this.props.addComment}/>
            )
        }
        
        return (
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />}/>
                    <Route path="/menu/:dishId"f component={DishWithId}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
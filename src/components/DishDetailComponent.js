import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class DishDetail extends Component{
    constructor(props){
        super(props);
    }
    
    renderDish(dish) {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle heading="true"><strong>{dish.name}</strong></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    
    renderComments(dish){
        const comments = dish.comments.map((comment) => {
            let options = {year: 'numeric', month: 'short', day: '2-digit'};
            return (
                <ul className="list-unstyled" key={comment.id}>
                    <li>{comment.comment}</li>
                    <li>-- {comment.author} , {<span>{new Intl.DateTimeFormat('en-US', options).format(new Date(comment.date))}</span>}</li>
                </ul>
            )
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comments}
            </div>
        );
    }
    
    render(){
        const dish = this.props.selectedDish;
        
        if (dish != null){
            return (
                <div className="row">
                    {this.renderDish(dish)}
                    {this.renderComments(dish)}
                </div>
            );
        } else {
            return (<div/>);
        }
    }
    
}

export default DishDetail;

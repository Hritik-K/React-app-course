import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            isModalOpen: false
        };
        
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
    }
    
    handleSubmit(values){
        this.toggleCommentForm();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleCommentForm() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render(){
        return(
            <>
            <Button outline onClick={this.toggleCommentForm}><span className="fa fa-pencil"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleCommentForm}>
                <ModalHeader toggle={this.toggleCommentForm}><strong>Submit Comment</strong></ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="container">
                        <Row className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" className="form-control" defaultValue = "5">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                            </Control.select>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text model=".author" className="form-control" placeholder="Your Name" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                            <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{required: 'Required',minLength: 'Must be greater than 2 characters',maxLength: 'Must be 15 characters or less'}}/>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" className="form-control" rows="6"/>
                        </Row>
                        <Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }
}

function RenderDish({dish}) {
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

function RenderComments({comments, addComment, dishId}){
    const commentsToRender = comments.map((comment) => {
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
            {commentsToRender}
            <CommentForm dishId={dishId} addComment={addComment}/>
        </div>
    );
}

const DishDetail = (props) => {
    const dish = props.dish;
    const comments = props.comments;
    if (props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>>
                </div>
            </div>
        );
    }
    else if (dish != null){
        return (
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr></hr>
                </div>
                    <div className="row">
                        <RenderDish dish={dish}/>
                        <RenderComments comments={comments} addComment={props.addComment} dishId={props.dish.id}/>
                    </div>
            </div>
        );
    } else {
        return (<div/>);
    }
}

export default DishDetail;

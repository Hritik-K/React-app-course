import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb, BreadcrumbItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

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

    function RenderComments({comments}){
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
            </div>
        );
    }

    const DishDetail = (props) => {
        const dish = props.dish;
        const comments = props.comments;
        if (dish != null){
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
                            <RenderComments comments={comments}/>
                        </div>
                </div>
            );
        } else {
            return (<div/>);
        }
    }


export default DishDetail;

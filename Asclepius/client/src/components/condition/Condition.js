import React, { useContext } from "react";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import CommentList from "../Comment/CommentList";

const Condition = ({ condition }) => {
    const { activeUser } = useContext(UserProfileContext);

    if (condition.userProfileId == parseInt(sessionStorage.userProfileId)) {
        return (

            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Author: {condition.userProfile.displayName}</p>
                    </Col>
                    <Col sm="4">
                        <p><strong>{condition.title}</strong></p>
                    </Col>

                    <Col sm="4">
                        <p>Category: {condition.category.name}</p>
                    </Col>
                </Row>
                <CardImg top src={condition.imageLocation} alt={condition.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/condition" ?
                                <NavLink to={`condition/details/${condition.id}`}><Button >Details</Button></NavLink> : <NavLink to={`details/${condition.id}`}><Button >Details</Button></NavLink>}
                            <CommentList />
                        </Col>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/condition" ?
                                <NavLink to={`condition/edit/${condition.id}`}><Button>Edit Condition</Button></NavLink> : <NavLink to={`edit/${condition.id}`}><Button>Edit Condition</Button></NavLink>}
                        </Col>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/condition" ?
                                <NavLink to={`condition/delete/${condition.id}`}><Button>Delete Condition</Button></NavLink> : <NavLink to={`delete/${condition.id}`}><Button>Delete Condition</Button></NavLink>}
                        </Col>
                    </Row>
                </CardBody>


            </Card>



        );
    } else if (activeUser = (true)) {

        return (

            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Author: {condition.userProfile.displayName}</p>
                    </Col>
                    <Col sm="4">
                        <p><strong>{condition.title}</strong></p>
                    </Col>

                    <Col sm="4">
                        <p>Category: {condition.category.name}</p>
                    </Col>
                </Row>
                <CardImg top src={condition.imageLocation} alt={condition.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/condition" ?
                                <NavLink to={`condition/details/${condition.id}`}><Button to={`/condition/details/${condition.id}`} >Details</Button></NavLink> : <NavLink to={`details/${condition.id}`}><Button to={`details/${condition.id}`} >Details</Button></NavLink>}
                        </Col>

                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/condition" ?
                                <NavLink to={`condition/delete/${condition.id}`}><Button>Delete Condition</Button></NavLink> : <NavLink to={`delete/${condition.id}`}><Button>Delete Condition</Button></NavLink>}
                        </Col>
                    </Row>
                </CardBody>


            </Card>



        );
    }

    else {
        return (

            <Card className="m-4">
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Author: {condition.userProfile.displayName}</p>
                    </Col>

                </Row>
                <Row>
                    <Col sm="8">
                        <h2><strong>{condition.title}</strong></h2>
                    </Col>

                    <Col sm="4">
                        <p>Category: {condition.category.name}</p>
                    </Col>
                </Row>
                <CardImg top src={condition.imageLocation} alt={condition.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/condition" ?
                                <NavLink to={`condition/details/${condition.id}`}><Button to={`/condition/details/${condition.id}`} >Details</Button></NavLink> : <NavLink to={`details/${condition.id}`}><Button to={`details/${condition.id}`} >Details</Button></NavLink>}
                        </Col>

                    </Row>


                </CardBody>
            </Card>

        );
    }

};

export default Condition;
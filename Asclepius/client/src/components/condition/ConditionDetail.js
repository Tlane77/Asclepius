import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, Row, Col, CardImg, CardBody, Button, CardTitle, CardSubtitle, Container } from "reactstrap";
import { ConditionContext } from "../../providers/ConditionProvider";
import { ImageContext } from '../../providers/ImageProvider';
import { useParams, useHistory, Link } from "react-router-dom";
import "./Condition.css"
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import CommentList from "../Comment/CommentList";
import { CommentContext, CommentsContext } from "../../providers/CommentProvider";


const ConditionDetail = () => {
    const { getSingleCondition, condition } = useContext(ConditionContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const { getImageName } = useContext(ImageContext);
    const { id } = useParams();
    const history = useHistory();
    const { userProfile } = useContext(UserProfileContext);
    const { activeUser } = useContext(UserProfileContext);
   


    useEffect(() => {

        getSingleCondition(id)
        console.log("singleCondition", id)
    }, []);
    console.log("singleCondition", id)





    const imageName = () => {
        if (condition != undefined) { getImageName(condition.imageLocation) }
    }
    // useEffect(() => {
    //     //verify there condition is not undefined before getting subscriptions
    //     condition(JSON.parse(sessionStorage.getItem("userProfile")).id, condition.userProfileId)
    // }, [condition]);

    // useEffect(() => {
    //     //ensure condition is not undefined
    //     if (condition) {
    //         //determine if current use is condition author
    //         if (JSON.parse(sessionStorage.getItem("userProfile")).id == condition.userProfileId) {
    //             setIsAuthor(true)
    //         }

    // }

    //});


    //formated publication date to MM / DD / YYYY



    const createDate = () => {
        if (condition != undefined) { new Date(condition.createDateTime) }
    }
    // const formatedDate = `${createDate.getMonth() + 1}/${createDate.getDate()}/${createDate.getFullYear()}`


    return (
        <div className="conditionDetailsCardContainer">
            <Card className="m-auto">
                <CardBody>
                    <div className="condition_Detail">
                        <div>
                            <h2>{condition.title}</h2>
                            <CardSubtitle>By {condition.userProfile.displayName}</CardSubtitle>
                        </div>

                    </div>
                </CardBody>
                {condition.imageLocation === "" || condition.imageLocation === null ?
                    <CardImg top />
                    :
                    <CardImg top src={imageName} alt={condition.title} />
                }
                <CardBody>
                    <p style={{ whiteSpace: "pre-wrap" }}>{condition.content}</p>
                    <p>{condition.createDateTime}</p>
                    <Button type="button"
                        style={{ margin: 10 }}
                        onClick={() => { history.goBack() }}>
                        Back
                </Button>
                    <Link to={`/conditions/${condition.id}/comments`}><Button className="conditionCommentButton" style={{ margin: 10 }}
                    >Comments</Button></Link>

                    <Button type="button"
                        style={{ margin: 10 }}
                        onClick={() => { history.push(`/conditions/`) }}>
                        Condition List
                </Button>


                    {JSON.parse(sessionStorage.getItem("userProfile")).id === condition.userProfileId && <Button color="danger"
                        style={{ margin: 10 }}

                        onClick={() => { history.push(`/conditions/delete/${id}`) }}>
                        Delete

                </Button >}
                    {JSON.parse(sessionStorage.getItem("userProfile")).id === condition.userProfileId && <Button color="info"
                        style={{ margin: 10 }}

                        onClick={() => { history.push(`/conditions/edit/${id}`) }}>
                        Edit

                </Button >}
                </CardBody >

                <CardBody>
                    {/* <Row>
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
                    </Row> */}
                </CardBody>

            </Card >
        </div>
    );
};


export default ConditionDetail;

import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody, Button } from "reactstrap";
import { ConditionContext } from "../../providers/ConditionProvider";
import { useParams, useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const DeleteCondition = () => {
    const [condition, setCondition] = useState({});
    const { getSingleCondition, DeleteCondition } = useContext(ConditionContext);
    const { conditionId } = useParams();
    const history = useHistory();
    const { userProfile } = useContext(UserProfileContext);


    useEffect(() => {
        getSingleCondition(conditionId)
    }, [])

    useEffect(() => {
        setCondition(condition)
    }, [condition])



    if (!condition) {
        return null;
    }

    if (condition.userProfileId === JSON.parse(sessionStorage.getItem("userProfile")).id) {


        return (
            <Card className="m-4">

                <h1>You are about to Delete a Condition</h1>
                <h2> Are you sure you want to delete this Condition? "{condition.title}"</h2>
                <CardBody>
                    <Button color="info"
                        style={{ margin: 10 }}
                        onClick={() => { history.push(`/conditions/${conditionId}`) }}>
                        Not at this Moment
                </Button>
                    <Button color="danger"
                        style={{ margin: 10 }}
                        onClick={() => {
                            DeleteCondition(conditionId)
                                .then(() => {
                                    history.push(`/conditions/`)
                                })
                        }
                        }
                    >Yes, this is not valid information anymore!
                </Button>
                </CardBody>
            </Card>
        );
    } else {
        return (
            <h1>Do you want to return to home?..</h1>
        )
    }
};


export default DeleteCondition;
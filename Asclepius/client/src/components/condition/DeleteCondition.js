import React, { useEffect, useContext, useState } from "react";
import {  Card, CardBody, Button } from "reactstrap";
import { ConditionContext } from "../../providers/ConditionProvider";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import "./Condition.css"

const DeleteCondition = () => {
   
    const { getSingleCondition, DeleteCondition, condition } = useContext(ConditionContext);
    const { conditionId } = useParams();
    const history = useHistory();
    const { userProfile } = useContext(UserProfileContext);
    const [conditionToDelete, setConditionToDelete] = useState({});

    // const handleDeleteCondition = (e) => {
    //     e.preventDefault();
    //     DeleteCondition(conditionToDelete.conditionId)
    // }

    useEffect(() => {
        getSingleCondition(conditionId)
    }, [])




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
                        onClick={() => { history.push(`/conditions`) }}>
                        Not at this Moment
                </Button>
                    <Button color="danger"
                        style={{ margin: 10 }}
                        onClick={() => {
                            DeleteCondition(conditionId)
                                .then(() => {
                                    history.push(`/conditions`)
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
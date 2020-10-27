import { Button, Card, CardBody } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";
import React, { useContext, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom"
import "./Comment.css"


const Comment = ({ comment }) => {
    const { deleteComment } = useContext(CommentContext)
    const history = useHistory();
    const { conditionId, commentId } = useParams();
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;
    const submit = () => {

        deleteComment(comment.id).then(() => {
            history.push("/");

        })

    }

    return (
        <Card style={{ border: "groove" }}>
            <div className="commentCard">
                <CardBody>
                    <div>{comment.userProfile.firstName} {comment.userProfile.lastName}</div>

                    <strong>{comment.subject}</strong>
                    <div className="commentTextArea">{comment.content}</div>
                    <div>
                        {(currentUser === comment.userProfileId) ?
                            <Link to={`/conditions/${conditionId}/comments/${comment.id}/delete`}>
                                <Button color="danger" className="commentButton">Delete</Button>
                            </Link>
                            : <div></div>}

                        {(currentUser === comment.userProfileId) ?
                            <Link to={`/conditions/${conditionId}/comments/${comment.id}/edit`}>
                                <Button className="commentButton">Edit</Button>
                            </Link>
                            : <div></div>}
                    </div>
                </CardBody>
            </div>
        </Card>
    )
};

export default Comment;
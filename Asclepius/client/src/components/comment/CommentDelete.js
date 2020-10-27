import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams, Link } from 'react-router-dom';
import { CommentContext } from "../../providers/CommentProvider";
import { Button, Card, CardBody } from "reactstrap";
import "./Comment.css"



const CommentDelete = () => {
    const [comment, setComment] = useState();
    const { getCommentById, deleteComment } = useContext(CommentContext);
    const { id, conditionId, commentId } = useParams();
    const history = useHistory();

    useEffect(() => {
        getCommentById(commentId).then(setComment);
    }, []);
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    const handleDelete = (id) => {
        deleteComment(commentId)
            .then(() => history.push(`/conditons/${conditionId}/comments`))
    }

    if (!comment) {
        return null;
    }

    if (currentUser !== comment.userProfileId) {
        return null;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    <h3>Are you Sure you want to Delete?</h3>
                    <div>Author: {comment.userProfile.firstName} {comment.userProfile.lastName}</div>
                    <div>Subject: <strong>{comment.subject}</strong></div>
                    <div>Content: {comment.content}</div>


                    {(currentUser === comment.userProfileId) ? <Button onClick={handleDelete} color="danger" className="commentButton">Delete</Button> : <div>a</div>}

                    <Link to={`/conditions/${conditionId}/comments`}>
                        <Button color="secondary" className="commentButton">Back</Button>
                    </Link>

                </div>
            </div>
        </div>
    )
}
export default CommentDelete;
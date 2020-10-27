import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";
import { useParams, useHistory, Link } from 'react-router-dom';



const CommentList = () => {
    const { comments, getCommentsByConditionId } = useContext(CommentContext);
    const { conditionId } = useParams();

    useEffect(() => {
        getCommentsByConditionId(conditionId);
    }, []);

    return (
        <>
            <p><Link to={`/conditions/${conditionId}/comments/new`}>New Comment</Link></p>
            <p><Link to={`/conditions/${conditionId}`}>Back to Condition</Link></p>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {comments.map((comment) =>
                            <Comment key={comment.id} comment={comment}
                            />

                        )}
                    </div>
                </div>
            </div>
        </>
    )

};

export default CommentList;
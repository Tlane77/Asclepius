import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/comment";


    //Get all Comments for Condition
    const getAllComments = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments));


    //Get Individual Condition With all comments for that condition
    const getCommentsByConditionId = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/GetCommentsByConditionId/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(res => res.json())
                .then(setComments));



    //Get a Single Comment By it's Id
    const getCommentById = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                }
            }).then((res) => res.json()));

    //Add a comment to the condition
    const addComment = (comment) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    //Edit Individual Comment
    const editComment = (comment) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${comment.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }));

    //Delete individual Comment
    const deleteComment = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));

    //CommentContext list to use thoughout client-side
    return (
        <CommentContext.Provider value={{ comments, getAllComments, getCommentById, getCommentsByConditionId, addComment, editComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
};
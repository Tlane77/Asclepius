import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const ConditionContext = React.createContext();

export const ConditionProvider = (props) => {
    const [conditions, setConditions] = useState([]);
    const [condition, setCondition] = useState({});
    const { getToken } = useContext(UserProfileContext);


    //View All Conditions
    const getAllConditions = () => {
        getToken().then((token) =>
            fetch(`/api/condition/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setConditions));
    }

    ///Get Single Condition
    const getSingleCondition = (id) => {
        getToken().then((token) =>
            fetch(`/api/condition/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setCondition));
    }

    //Add a Condition
    const addCondition = (condition) =>
        getToken().then((token) =>
            fetch("/api/condition/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(condition)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const EditCondition = (condition) =>
        getToken().then((token) =>
            fetch(`/api/condition/${condition.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(condition),
            }));

    const DeleteCondition = (id) =>
        getToken().then((token) =>
            fetch(`/api/condition/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));



    return (
        //this provides the state value of the conditions array, the functions to fetch all conditions and add a new conditon with Edit and Delete Components, get all the conditions, get one single condition
        <ConditionContext.Provider value={{ condition, conditions, setCondition, setConditions, getAllConditions, addCondition, EditCondition, getSingleCondition, DeleteCondition }}>
            {props.children}
        </ConditionContext.Provider>
    );
};
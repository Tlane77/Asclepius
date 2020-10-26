import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const ConditionContext = React.createContext();

export const ConditionProvider = (props) => {
    const [conditions, setConditions] = useState([]);
    const [condition, setCondition] = useState([]);
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
            fetch(`/api/conditon/${condition.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(condition),
            }));




    return (
        <ConditionContext.Provider value={{ condition, conditions, getAllConditions, addCondition, EditCondition }}>
            {props.children}
        </ConditionContext.Provider>
    );
};
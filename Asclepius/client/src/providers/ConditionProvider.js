import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ConditionContext = React.createContext();

export const ConditionProvider = (props) => {
    const [conditions, setConditions] = useState([]);
    const { getToken } = useContext(UserProfileContext);

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
    return (
        <ConditionContext.Provider value={{ conditions, getAllConditions, }}>
            {props.children}
        </ConditionContext.Provider>
    );
};
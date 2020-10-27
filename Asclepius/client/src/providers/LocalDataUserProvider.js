import React, { createContext } from "react";

export const LocalDataUserContext = createContext();

export function LocalDataUserProvider(props) {
    const userId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const userFirstName = JSON.parse(sessionStorage.getItem("userProfile")).firstName;
    const userLastName = JSON.parse(sessionStorage.getItem("userProfile")).lastName
    const userFullName = JSON.parse(sessionStorage.getItem("userProfile")).fullName;
    const userImageLoc = JSON.parse(sessionStorage.getItem("userProfile")).imageLocation;
    const userDisplayName = JSON.parse(sessionStorage.getItem("userProfile")).displayName;
    const userTypeName = JSON.parse(sessionStorage.getItem("userProfile")).userType.name;

    return (
        <LocalDataUserContext.Provider
            value={{ userId, userFirstName, userLastName, userFullName, userImageLoc, userDisplayName, userTypeName }}>
            {props.children}
        </LocalDataUserContext.Provider>
    );
}
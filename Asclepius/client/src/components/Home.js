import React, { useContext, useEffect, useState } from 'react';
import { ConditionContext } from "../providers/ConditionProvider";
import { useHistory, Link } from "react-router-dom";
import "./Home.css"
import { LocalDataUserContext } from "../providers/LocalDataUserProvider";

const Home = () => {

    const {
        userId,
        userFirstName,
        userImageLoc
    } = useContext(LocalDataUserContext);


    return (
        <div className="Home">
            <div className="logo_Side">


            </div>



        </div>
    )
}

export default Home;

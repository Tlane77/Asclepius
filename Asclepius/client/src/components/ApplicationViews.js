import React, { useContext } from "react";
import { Switch, Route, } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
//import ConditionList from "../components/condition/ConditionList";
//import ConditionAddForm from "../components/condition/ConditionAddForm";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                {/* <Route path="/" exact>
                    {isLoggedIn ? <ConditionList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/add">
                    {isLoggedIn ? <ConditionAddForm /> : <Redirect to="/login" />}
                </Route> */}

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
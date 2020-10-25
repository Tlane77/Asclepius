import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import ConditionList from "./Condition/ConditionList";
import ConditionForm from "./Condition/ConditionForm";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { id } = useParams();

  return (
    <main>
      <Switch>
        <Route path="/conditions" exact>
          {isLoggedIn ? <ConditionList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/add" exact>
          {isLoggedIn ? <ConditionForm /> : <Redirect to="/login" />}
        </Route>

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
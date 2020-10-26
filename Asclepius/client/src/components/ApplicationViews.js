import React, { useContext } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import ConditionList from "./Condition/ConditionList";
import ConditionForm from "./Condition/ConditionForm";
import EditCondition from "./Condition/EditCondition";
import DeleteCondition from "./Condition/DeleteCondition";
import CategoryList from "./Category/CategoryList";
import CategoryForm from "./Category/CategoryForm";
import CategoryEdit from "./Category/CategoryEdit";
import CategoryDelete from "./Category/CategoryDelete";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { id } = useParams();

  return (
    <main>
      <Switch>

        {/* Start of Condition Routes */}
        <Route path="/conditions" exact>
          {isLoggedIn ? <ConditionList /> : <Redirect to="/login" />}
          {/* {isLoggedIn ? <ConditionList /> : <ConditionList />} */}
        </Route>

        <Route path="/add" exact>
          {isLoggedIn ? <ConditionForm /> : <Redirect to="/login" />}
          {/* {isLoggedIn ? <ConditionForm /> : <ConditionForm />} */}
        </Route>


        <Route path="/conditions/edit/:conditionId(\d+)" exact>
          {isLoggedIn ? <EditCondition /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/delete/:postId(\d+)" exact>
          {isLoggedIn ? <DeleteCondition /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        {/* End of Condition Routes */}

        {/* Category Routes */}
        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/category/add">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/category/:id/delete">
          {isLoggedIn ? <CategoryDelete /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/category/:id/edit">
          {isLoggedIn ? <CategoryEdit /> : <Redirect to="/login/" />}
        </Route>

        {/* End of Category Routes */}

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
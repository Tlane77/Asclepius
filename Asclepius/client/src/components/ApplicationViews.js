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
import UserProfileList from "./UserProfile/UserProfileList";
import UserProfileDetails from './UserProfile/UserProfileDetails';
import UserProfileEdit from './UserProfile/UserProfileEdit';
import CommentList from "./Comment/CommentList";
import Home from "./Home";
import { LocalDataUserProvider } from "../providers/LocalDataUserProvider";
import CommentEditForm from "./Comment/CommentEditForm";
import CommentDelete from "./Comment/CommentDelete";
import CommentForm from "./Comment/CommentForm";
import { CommentProvider } from "../providers/CommentProvider";



export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const { id } = useParams();

  return (
    <main>
      <Switch>

        {/* Local Data */}

        <Route path="/" exact>
          {isLoggedIn ?
            <LocalDataUserProvider>
              <Home />
            </LocalDataUserProvider>
            : <Redirect to="/login" />}
        </Route>

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

        <Route path="/conditions/delete/:conditionId(\d+)" exact>
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

        {/* Comment Routes */}
        <Route path="/conditions/:conditionId/comments/:commentId/delete">
          {isLoggedIn ? <CommentProvider><CommentDelete /></CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/conditions/:conditionId/comments/:commentId(\d+)/edit">
          {isLoggedIn ? <CommentProvider><CommentEditForm /></CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/comment/:id/edit">
          {isLoggedIn ? <CommentProvider><CommentEditForm /> </CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/conditions/:conditionId/comments" exact>
          {isLoggedIn ? <CommentProvider> <CommentList /> </CommentProvider> : <Redirect to="/login/" />}
        </Route>

        <Route path="/conditions/:conditionId/comments/new">
          {isLoggedIn ? <CommentProvider> <CommentForm /> </CommentProvider> : <Redirect to="/login/" />}
        </Route>
        {/* End of Comment Routes */}

        {/* User Profile Routes */}

        <Route path="/user" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/user/:id(\d+)/details" exact>
          {isLoggedIn ? <UserProfileDetails /> : <Redirect to="/login/" />}
        </Route>
        <Route path="/user/:id(\d+)/edit" exact>
          {isLoggedIn ? <UserProfileEdit /> : <Redirect to="/login/" />}
        </Route>

        {/* End User Profile Routes */}

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
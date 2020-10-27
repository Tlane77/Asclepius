import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { ConditionProvider } from "./providers/ConditionProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { ImageProvider } from './providers/ImageProvider';
import CommentList from './components/Comment/CommentList';
import { CommentProvider } from './providers/CommentProvider';
import CommentForm from './components/Comment/CommentForm';
import CommentDelete from './components/Comment/CommentDelete';


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ImageProvider>
          <ConditionProvider>
            <CategoryProvider>
              <Header />
              <ApplicationViews />
            </CategoryProvider>
          </ConditionProvider>
        </ImageProvider>

      </UserProfileProvider>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { ConditionProvider } from "./providers/ConditionProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import Header from "./components/Header";
//Import the ApplicationViews component into app.js and wrap it in other Providers and the Router on outer.
import ApplicationViews from "./components/ApplicationViews";
import { ImageProvider } from './providers/ImageProvider';
import Footer from './Footer';




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
        <Footer />
      </UserProfileProvider>
    </Router>
  );
}

export default App;
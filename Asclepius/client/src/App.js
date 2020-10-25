import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { ConditionProvider } from "./providers/ConditionProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ConditionProvider>
          <Header />
          <ApplicationViews />
        </ConditionProvider>

      </UserProfileProvider>
    </Router>
  );
}

export default App;
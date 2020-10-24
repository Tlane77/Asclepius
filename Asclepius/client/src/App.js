
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ConditionProvider from "./providers/ConditionProvider";
import CommentProvider from "./providers/CommentProvider";
import CategoryProvider from "./providers/CategoryProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <ConditionProvider>
          <CommentProvider>
            <CategoryProvider>

              <Header />
              <ApplicationViews />

            </CategoryProvider>
          </CommentProvider>
        </ConditionProvider>
      </UserProfileProvider>
    </Router >

  );
}

export default App;

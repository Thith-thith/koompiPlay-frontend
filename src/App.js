import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserInfo from "./components/userInfo";
// import QuizState from "./Context/QuizState";
// import QuizGame from "./components/pages/QuizGame";
import Start from './components/start';
import Play from './components/pages/Play';
import Result from './components/pages/Result';

function App() {
  return (
    // <QuizState>
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/userinfo" component={UserInfo} exact />
          {/* <Route exact path="/" component={QuizGame} /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/start" component={Start} />
          <Route exact path="/quiz" component={Play} />
          <Route exact path="/result" component={Result} />
          <Redirect to="/" component={Start} />
        </Switch>
      </Router>
    </React.Fragment>
    // </QuizState>
  );
}

export default App;

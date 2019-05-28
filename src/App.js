import "./App.css";
import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Template from "./components/Template";
import GroupList from "./components/GroupList";
import ModalForgotPass from "./components/ModalForgotPass";
import ConfirmPassword from "./components/ConfirmPassword";
function App() {
  return (
    <div className="App">
      <Router>
        <Template>
          <Route exact path="/" component={GroupList} />
          <Route path="/reset-password" component={ModalForgotPass} />
          <Route path="/api/reset/:token" component={ConfirmPassword} />
        </Template>
      </Router>
    </div>
  );
}

export default App;

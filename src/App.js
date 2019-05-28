import "./App.css";
import React from "react";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Template from "./components/Template";
import GroupList from "./components/GroupList";
import ModalForgotPass from "./components/ModalForgotPass";
import ConfirmPassword from "./components/ConfirmPassword";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Template>
          <Switch>
            <GroupList />
            <Route path="/reset-password" component={ModalForgotPass} />
            <Route
              path="/confirm-password/:token"
              component={ConfirmPassword}
            />
            <Route path="/" exact component={GroupList} />
          </Switch>
        </Template>
      </BrowserRouter>
    </div>
  );
}

export default App;

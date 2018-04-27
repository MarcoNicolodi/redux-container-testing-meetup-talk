import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import createStore from "./lib/createStore";
import withBaseLayout from "./hocs/with-base-layout";
import List from "./features/list";

const store = createStore();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={withBaseLayout(List)} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;

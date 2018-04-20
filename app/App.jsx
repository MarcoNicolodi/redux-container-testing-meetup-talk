import React from "react";
import { Provider } from "react-redux";
import createStore from "./lib/createStore";
import List from "./features/list";

const store = createStore();

const App = () => (
  <Provider store={store}>
    <List />
  </Provider>
);

export default App;

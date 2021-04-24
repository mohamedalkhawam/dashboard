import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routes from "./routes/Index";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import "./index.css";
import { loadUser } from "./redux/actions/auth";
import { useState, useEffect } from "react";

const history = createBrowserHistory();

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log(store.getState());
  }, []);
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route component={Routes} />
      </Router>
    </Provider>
  );
}

export default App;

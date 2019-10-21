import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { searchResults, userChoice } from "./reducers/reducers";

const store = createStore(
  combineReducers({
    searchResults,
    userCheckList: userChoice
  }),
  window.devToolsExtension && window.devToolsExtension()
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

serviceWorker.unregister();

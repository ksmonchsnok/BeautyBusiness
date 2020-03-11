import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker.js";

import firebase from "firebase";
import rootReducer from "../src/service/reducers.js";
import firebaseConfig from "./service/firebase-config";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";

firebase.initializeApp(firebaseConfig);

// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, { userProfile: "users" })
// )(createStore);

// const initialState = {};
// const store = createStoreWithFirebase(rootReducer, initialState);

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );
// registerServiceWorker();

const AppProject = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(<AppProject />, document.getElementById("root"));
serviceWorker.unregister();

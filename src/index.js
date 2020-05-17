import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import createReduxStore from "./service/firebase/createReduxStore.js";
import firebase from "firebase";
import firebaseConfig from "./service/firebase/firebase-config.js";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker.js";

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
  userProfile: "users",
};
const store = createReduxStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const AppProject = () => (
  <Provider store={store}>
    <BrowserRouter>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(<AppProject />, document.getElementById("root"));
serviceWorker.register();

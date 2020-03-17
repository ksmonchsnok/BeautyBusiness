
import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import createReduxStore from './service/firebase/createReduxStore.js'
import firebase from "firebase";
import firebaseConfig from "./service/firebase/firebase-config.js";
import { Provider } from "react-redux";

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
  userProfile: "users"
};
const store = createReduxStore()

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

const AppProject = () => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>
);
 ReactDOM.render(<AppProject />, document.getElementById("root"));
serviceWorker.unregister();

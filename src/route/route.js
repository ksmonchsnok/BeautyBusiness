import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Home
import Home from "../pages/home/home.js";
import AllStores from "../pages/store/allStores.js";
import StoreDetail from "../pages/store/store-detail.js";
import Nearby from "../pages/nearby/nearby.js";

// Admin
import Admin from "../pages/admin/admin.js";
import AddUser from "../pages/user/addUser.js";

// User
import User from "../pages/user/user.js";
import UpdateUser from "../pages/user/updateUser.js";

// Manager
import Manager from "../pages/user/manager.js";
import UpdateStore from "../pages/manager/updateStorer.js";
import managePromotion from "../pages/manager/managePromotion.js";
import Report from "../pages/manager/report.js";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("auth") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default () => (
  <BrowserRouter>
    <Switch>
      {/* Home */}
      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />

      <Route exact path="/AllStores" component={AllStores} />
      <Route exact path="/StoreDetail" component={StoreDetail} />
      <Route exact path="/Nearby" component={Nearby} />

      {/* Admin */}
      <Route exact path="/Admin" component={Admin} />
      <Route exact path="/AddUser" component={AddUser} />

      {/* <PrivateRoute exact path="/admin" component={Admin} /> */}

      {/* User */}
      <Route exact path="/User" component={User} />
      <Route exact path="/UpdateUser" component={UpdateUser} />

      {/* Manager */}
      <Route exact path="/Manager" component={Manager} />
      <Route exact path="/UpdateStore" component={UpdateStore} />
      <Route exact path="/managePromotion" component={managePromotion} />
      <Route exact path="/Report" component={Report} />
    </Switch>
  </BrowserRouter>
);

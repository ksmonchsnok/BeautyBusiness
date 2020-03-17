import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Home
import Home from "../pages/home/home.js";
import AllStores from "../pages/store/allStores.js";
import StoreDetail from "../pages/store/store-detail.js";
import Nearby from "../pages/nearby/nearby.js";

// Admin
import Admin from "../pages/admin/admin.js";
import ManageUser from "../pages/admin/addUser.js";
import ManageStore from "../pages/admin/updateStorer.js";
import managePromotionAndDiscount from "../pages/admin/managePromotion.js";
import ReportForAdmin from "../pages/admin/report.js";
import UserList from "../pages/admin/userList.js";
import StoreList from "../pages/admin/storeList.js";

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
      <Route exact path="/ManageUser" component={ManageUser} />
      <Route exact path="/ManageStore" component={ManageStore} />
      <Route
        exact
        path="/managePromotionAndDiscount"
        component={managePromotionAndDiscount}
      />
      <Route exact path="/ReportForAdmin" component={ReportForAdmin} />

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
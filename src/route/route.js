import React from "react";
import {BrowserRouter as Router,Switch,Redirect,Route} from 'react-router-dom';


// Home
import Home from "../pages/home/home.js";
import AllStores from "../pages/store/allStores.js";
import StoreDetail from "../pages/store/store-detail.js";
import Nearby from "../pages/nearby/nearby.js";

// Admin
import Admin from "../pages/admin/loginForAdmin.js";
import AdminPage from "../pages/admin/admin.js";

import LoginForAdmin from "../pages/admin/loginForAdmin.js"
import ManageUser from "../pages/admin/addUser.js";
import managePromotionAndDiscount from "../pages/admin/managePromotion.js";
import ReportForAdmin from "../pages/admin/report.js";
import UserList from "../pages/admin/userList.js";
import StoreList from "../pages/admin/storeList.js";
import AddStore from "../pages/admin/addStore.js";
import AddUser from "../pages/admin/addUser.js";

// User
import User from "../pages/user/user.js";

// Manager
import Manager from "../pages/manager/manager.js";
import managePromotion from "../pages/manager/managePromotion.js";
import Report from "../pages/manager/report.js";
import Footer from "../components/footer/footer.js";

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
  

  <Router>
      <Route exact path="/LoginForAdmin" component={LoginForAdmin} />

     <Switch >
      {/* Home */}

      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />


      <Route exact path="/AllStores" component={AllStores} />
      <Route exact path="/StoreDetail" component={StoreDetail} />
      <Route exact path="/Nearby" component={Nearby} />
      {/* <PrivateRoute exact path="/admin" component={Admin} /> */}

      {/* Admin */}
      <Route exact path="/Admin" component={Admin} />
      <Route exact path="/AdminPage" component={AdminPage} />

      <Route exact path="/ManageUser" component={ManageUser} />
      <Route exact path="/AddUser" component={AddUser} />
      <Route exact path="/AddStore" component={AddStore} />


      <Route
        exact
        path="/managePromotionAndDiscount"
        component={managePromotionAndDiscount}
      />
      <Route exact path="/ReportForAdmin" component={ReportForAdmin} />
      <Route exact path="/UserList" component={UserList} />

      <Route exact path="/StoreList" component={StoreList} />

      {/* User */}
      <Route exact path="/User" component={User} />


      {/* Manager */}
      <Route exact path="/Manager" component={Manager} />
      <Route exact path="/managePromotion" component={managePromotion} />
      <Route exact path="/Report" component={Report} />
    </Switch>
  </Router>
);

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Login,
  Error,
  HomeLayout,
  Landing,
  Activity,
  About,
  Certificate,
  UserManagement,
  Profile,
  MyActivity,
  MyControlBook,
  Exp,
  CreateActivity,
  UpdateActivity,
  CreateUsers,
  PrivateRoutes,
  EditUser,
  EditControlBook,
  SingleActivity,
  SingleUser,
  UpdatePassword,
  VipRoutes,
  VvipRoutes,
  EmailVerification,
} from "./pages";

import { ErrorElement } from "./components";
import { store } from "./store";

// loaders
// import { loader as loginLoader } from "./pages/Login";
import { loader as myActivityLoader } from "./pages/MyActivity";
import { loader as myControlBookLoader } from "./pages/MyControlBook";
import { loader as activityLoader } from "./pages/Activity";
import { loader as userManagementLoader } from "./pages/UserManagement";
import { loader as singleActivityLoader } from "./pages/SingleActivity";
import { loader as singleUserLoader } from "./pages/SingleUser";
import { loader as ladingLoader } from "./pages/Landing";
import { loader as certificateLoader } from "./pages/Certificate";
import { loader as certificateValidateLoader } from "./pages/EmailVerification";
import { loader as createUserLoader } from "./pages/CreateUsers";
import { loader as editUserLoader } from "./pages/EditUser";
import { loader as editControlBookLoader } from "./pages/EditControlBook";
import { loader as editActivityLoader } from "./pages/UpdateActivity";

// action
import { action as loginAction } from "./pages/Login";
import { action as createUserAction } from "./pages/CreateUsers";
import { action as editUserAction } from "./pages/EditUser";
import { action as singleUserAction } from "./pages/SingleUser";
import { action as editControlBookAction } from "./pages/EditControlBook";
import { action as createActivityAction } from "./pages/CreateActivity";
import { action as editActivityAction } from "./pages/UpdateActivity";
import { action as updateUserAction } from "./pages/Profile";
import { action as updatePasswordAction } from "./pages/UpdatePassword";
import { action as singleActivityAction } from "./pages/SingleActivity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: ladingLoader,
      },
      {
        path: "activity",
        element: <Activity />,
        errorElement: <ErrorElement />,
        loader: activityLoader,
      },
      {
        path: "activity/:id",
        element: <SingleActivity />,
        errorElement: <ErrorElement />,
        loader: singleActivityLoader(store),
        action: singleActivityAction(store),
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorElement />,
      },
      {
        path: "certificate",
        element: <Certificate />,
        errorElement: <ErrorElement />,
        loader: certificateLoader,
        // children: [
        //   {
        //     path: "validate",
        //     element: <EmailVerification />,
        //     errorElement: <ErrorElement />,
        //     loader: certificateValidateLoader,
        //   },
        // ],
      },
      {
        path: "email/verify",
        element: <EmailVerification />,
        errorElement: <ErrorElement />,
        loader: certificateValidateLoader,
      },

      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "profile",
            element: <Profile />,
            errorElement: <ErrorElement />,
            action: updateUserAction(store),
          },
          {
            path: "update-password",
            element: <UpdatePassword />,
            errorElement: <ErrorElement />,
            action: updatePasswordAction(store),
          },
          {
            path: "my-activity",
            element: <MyActivity />,
            errorElement: <ErrorElement />,
            loader: myActivityLoader(store),
          },
          {
            path: "my-control-book",
            element: <MyControlBook />,
            errorElement: <ErrorElement />,
            loader: myControlBookLoader(store),
          },
          {
            element: <VvipRoutes />,
            children: [
              {
                path: "create-activity",
                element: <CreateActivity />,
                errorElement: <ErrorElement />,
                action: createActivityAction(store),
              },
              {
                path: "update-activity/:id",
                element: <UpdateActivity />,
                errorElement: <ErrorElement />,
                loader: editActivityLoader(store),
                action: editActivityAction(store),
              },
              {
                path: "users/create",
                element: <CreateUsers />,
                errorElement: <ErrorElement />,
                loader: createUserLoader,
                action: createUserAction(store),
              },
              {
                path: "users/edit/:id",
                element: <EditUser />,
                errorElement: <ErrorElement />,
                loader: editUserLoader,
                action: editUserAction(store),
              },
            ],
          },
          {
            element: <VipRoutes />,
            children: [
              {
                path: "users",
                element: <UserManagement />,
                errorElement: <ErrorElement />,
                loader: userManagementLoader(store),
              },
              {
                path: "users/:id",
                element: <SingleUser />,
                errorElement: <ErrorElement />,
                loader: singleUserLoader(store),
                action: singleUserAction(store),
              },
              {
                path: "control-book/:id",
                element: <EditControlBook />,
                errorElement: <ErrorElement />,
                loader: editControlBookLoader,
                action: editControlBookAction(store),
              },
            ],
          },
        ],
      },

      {
        path: "exp",
        element: <Exp />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

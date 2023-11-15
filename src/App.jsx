import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Login,
  Error,
  Register,
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
} from "./pages";

import { ErrorElement } from "./components";
import { store } from "./store";

// actions
import { action as loginAction } from "./pages/Login";

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
import { loader as createUserLoader } from "./pages/CreateUsers";
import { loader as editUserLoader } from "./pages/EditUser";
import { loader as editControlBookLoader } from "./pages/EditControlBook";

// action
import { action as createUserAction } from "./pages/CreateUsers";
import { action as editUserAction } from "./pages/EditUser";
import { action as singleUserAction } from "./pages/SingleUser";
import { action as editControlBookAction } from "./pages/EditControlBook";

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
        loader: singleActivityLoader,
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
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "profile",
            element: <Profile />,
            errorElement: <ErrorElement />,
          },
          {
            path: "create-activity",
            element: <CreateActivity />,
            errorElement: <ErrorElement />,
          },
          {
            path: "update-activity/:id",
            element: <UpdateActivity />,
            errorElement: <ErrorElement />,
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
            path: "users",
            element: <UserManagement />,
            errorElement: <ErrorElement />,
            loader: userManagementLoader(store),
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
    // loader: loginLoader(store),
    action: loginAction(store),
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <Error />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

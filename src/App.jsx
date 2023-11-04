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
  ControlBook,
  Exp,
  CreateActivity,
  UpdateActivity,
} from "./pages";

import { ErrorElement } from "./components";
import { store } from "./store";

// actions
import { action as loginAction } from "./pages/Login";

// loaders
// import { loader as loginLoader } from "./pages/Login";
import { loader as myActivityLoader } from "./pages/MyActivity";
import { loader as controlBookLoader } from "./pages/ControlBook";
import { loader as activityLoader } from "./pages/Activity";
import { loader as userManagementLoader } from "./pages/UserManagement";
import SingleActivity, {
  loader as singleActivityLoader,
} from "./pages/SingleActivity";
import SingleUser, { loader as singleUserLoader } from "./pages/SingleUser";
import { loader as ladingLoader } from "./pages/Landing";
import { loader as expLoader } from "./pages/Exp";

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
        path: "users/:id",
        element: <SingleUser />,
        errorElement: <ErrorElement />,
        loader: singleUserLoader,
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
      },
      {
        path: "users",
        element: <UserManagement />,
        errorElement: <ErrorElement />,
        loader: userManagementLoader(store),
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
      {
        path: "my-activity",
        element: <MyActivity />,
        errorElement: <ErrorElement />,
        loader: myActivityLoader(store),
      },
      {
        path: "control-book",
        element: <ControlBook />,
        errorElement: <ErrorElement />,
        loader: controlBookLoader(store),
      },
      {
        path: "exp",
        element: <Exp />,
        errorElement: <ErrorElement />,
        loader: expLoader,
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

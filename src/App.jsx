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
} from "./pages";

import { ErrorElement } from "./components";
import { store } from "./store";

// actions
import { action as loginAction } from "./pages/Login";

// loaders
// import { loader as loginLoader } from "./pages/Login";

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
      },
      {
        path: "activity",
        element: <Activity />,
        errorElement: <ErrorElement />,
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
        path: "user-management",
        element: <UserManagement />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    // loader: loginLoader(store),
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

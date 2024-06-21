import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

import StateContextProvider from "./store/context-store";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfile from "./components2/UserProfile";
import AdminPage from "./pages/AdminPage";
import TaskPage from "./pages2/TaskPage";
import EmployeeList from "./pages2/EmployeeList";
import AdminProfile from "./components2/AdminProfile";
import RatingsPage from "./pages2/RatingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/task",
        element: <TaskPage />,
      },

      {
        path: "/user",
        element: <UserProfile />,
      },
      {
        path: "/ratings",
        element: <RatingsPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
        children: [
          {
            path: "employeeList",
            element: <EmployeeList />,
            children: [
              {
                path: "search",
                element: <EmployeeList />,
              },
            ],
          },
          {
            path: "profile",
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);
function App() {
  return (
    <StateContextProvider>
      <RouterProvider router={router} />
    </StateContextProvider>
  );
}

export default App;

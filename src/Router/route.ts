import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register/Register";
import LoginPage from "../pages/login/LoginPage";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import QuestionBuilder from "../pages/QuestionBuilder/question-builder";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"/question-builder",
        Component:QuestionBuilder
      }
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardOverview,
  },
]);

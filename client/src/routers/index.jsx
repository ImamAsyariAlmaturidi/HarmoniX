import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import DashboardPage from "../views/Dashboard";
import BaseLayout from "../components/BaseLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <BaseLayout />,
    children: [{
        path: '/dashboard',
        element: <DashboardPage />,
        loader: () => {
            if(!localStorage.access_token && !localStorage.spotify_token && !localStorage.premium){
                return redirect('/')
            }
            return null
        }
    }]
  }
]);

export default router
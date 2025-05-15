import AppLayout from "./AppLayout";
import LandingPage from "./components/landingpage/LandingPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import AuthCallback from "./components/landingpage/callback";
import Home from "./components/Home/Home";
import Inbox from "./components/inboxlayout/inboxlayout";

export const routes = [
  {
    path: "/login",
    element: <LandingPage />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "inbox",
        element: <Inbox />,
      },
    ],
  },
];

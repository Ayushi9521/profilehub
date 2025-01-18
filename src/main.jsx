import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux store/store.js";
import App from "./App.jsx";
import ProfileList from "./pages/ProfileList.jsx";
import ProfileDetail from "./components/ProfileDetail.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProfileForm from "./components/AdminProfileForm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.min.css";
import Summary from "./components/Summary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ProfileList /> },
      { path: "/profile/:id", element: <ProfileDetail /> },
      { path: "/profile/summary", element: <Summary /> },
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/add", element: <AdminProfileForm /> },
      { path: "/admin/edit", element: <AdminProfileForm /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </Provider>
);

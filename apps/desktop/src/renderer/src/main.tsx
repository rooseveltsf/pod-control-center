import HomePage from "./pages/Home";
import NewAppointmentPage from "./pages/NewAppointment";
import NotFoundPage from "./pages/NotFound";
import { createAppRouter } from "./routes";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import "./styles.css";

const router = createAppRouter(
  <HomePage />,
  <NewAppointmentPage />,
  <NotFoundPage />,
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

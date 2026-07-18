import HomePage from "./pages/Home";
import { createAppRouter } from "./routes";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";

import "./styles.css";

const router = createAppRouter(<HomePage />);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

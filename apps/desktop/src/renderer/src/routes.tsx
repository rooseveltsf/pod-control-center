import type { ReactNode } from "react";
import { createHashRouter, type RouteObject } from "react-router-dom";

export const paths = {
  home: "/",
  newAppointment: "/novo-agendamento",
} as const;

export function createAppRouter(
  homePage: ReactNode,
  newAppointmentPage: ReactNode,
  notFoundPage: ReactNode,
) {
  const routes: RouteObject[] = [
    {
      path: paths.home,
      element: homePage,
    },
    {
      path: paths.newAppointment,
      element: newAppointmentPage,
    },
    {
      path: "*",
      element: notFoundPage,
    },
  ];

  return createHashRouter(routes);
}

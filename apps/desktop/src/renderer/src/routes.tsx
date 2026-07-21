import type { ReactNode } from "react";
import { createHashRouter, type RouteObject } from "react-router-dom";

export const paths = {
  home: "/",
  myPods: "/meus-pods",
  newAppointment: "/novo-agendamento",
  planner: "/planner",
} as const;

export function createAppRouter(
  homePage: ReactNode,
  myPodsPage: ReactNode,
  newAppointmentPage: ReactNode,
  notFoundPage: ReactNode,
  plannerPage: ReactNode,
) {
  const routes: RouteObject[] = [
    {
      path: paths.home,
      element: homePage,
    },
    {
      path: paths.myPods,
      element: myPodsPage,
    },
    {
      path: paths.newAppointment,
      element: newAppointmentPage,
    },
    {
      path: paths.planner,
      element: plannerPage,
    },
    {
      path: "*",
      element: notFoundPage,
    },
  ];

  return createHashRouter(routes);
}

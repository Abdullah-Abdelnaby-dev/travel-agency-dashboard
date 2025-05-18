import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { Routes } from "./types/route";

export default [
  layout('routes/admin/AdminLayout.tsx', [
      route(Routes.DASHBOARD, "./routes/admin/dashboard.tsx"),
      route(Routes.AllUSERS, "./routes/admin/all-users.tsx"),
      route(Routes.TRIPS, "./routes/admin/trips.tsx"),
      
  ]),
] satisfies RouteConfig;
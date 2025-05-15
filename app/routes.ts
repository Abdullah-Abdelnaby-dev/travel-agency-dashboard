import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { Routes } from "./types/route";

export default [
  layout('routes/admin/layout.tsx', [
      route(Routes.DASHBOARD, "./routes/admin/dashboard.tsx"),
      route(Routes.POST, "./routes/admin/post.tsx"),
  ]),
] satisfies RouteConfig;
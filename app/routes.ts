import { type RouteConfig, layout, route } from "@react-router/dev/routes";
import { Routes } from "./types/route";

export default [
  route(Routes.SIGN_IN, 'routes/root/sign-in.tsx'),
  route(Routes.API_CREATE_TRIP, 'routes/api/create-trip.ts'),
  layout('routes/admin/AdminLayout.tsx', [
    route(Routes.DASHBOARD, 'routes/admin/dashboard.tsx'),
    route(Routes.AllUSERS, 'routes/admin/all-users.tsx'),
    route(Routes.TRIPS, 'routes/admin/trips.tsx'),
    route(Routes.CREATE_TRIP, 'routes/admin/createTrip.tsx'),
      
  ]),
] satisfies RouteConfig;
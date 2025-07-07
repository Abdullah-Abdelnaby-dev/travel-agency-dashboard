import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "js-mastery-ko",
  project: "travel-agecny",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};



export default defineConfig(config => {
  return {
  plugins: [tailwindcss(),tsconfigPaths(), reactRouter(),sentryReactRouter(sentryConfig, config)],
  // sentryConfig,
    ssr:{
    noExternal:[/@syncfusion/]
  }
  }});
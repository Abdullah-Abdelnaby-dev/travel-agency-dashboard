  import * as Sentry from "@sentry/react-router";
  import { nodeProfilingIntegration } from '@sentry/profiling-node';

  Sentry.init({
    dsn: "https://370ed9869a69dd392086ad017598a5ce@o4509270171713536.ingest.de.sentry.io/4509270176432208",
    
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Enable logs to be sent to Sentry
    _experiments: { enableLogs: true },
    
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    profilesSampleRate: 1.0, // profile every transaction
  });

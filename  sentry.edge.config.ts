import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fb59f8f066da0837ab1fbb88fa8aa764@o4506178103869440.ingest.sentry.io/4506178112192512",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
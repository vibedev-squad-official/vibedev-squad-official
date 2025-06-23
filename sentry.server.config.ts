import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
  
  // Environment and release tracking
  environment: process.env.NODE_ENV,
  
  // Only enable in production
  enabled: process.env.NODE_ENV === "production",
  
  // Server-specific integrations
  integrations: [
    // Add any server-specific integrations here
  ],
  
  // Debug in development
  debug: process.env.NODE_ENV === "development",
}); 
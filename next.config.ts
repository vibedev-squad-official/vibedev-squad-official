import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Ensure build works on DigitalOcean
  output: 'standalone',
  serverExternalPackages: ['@sentry/nextjs']
};

// Only apply Sentry config if we have the required environment variables
const shouldUseSentry = process.env.SENTRY_AUTH_TOKEN && process.env.NODE_ENV === 'production';

// Sentry configuration - only in production with proper auth
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin
  org: "sigmavue",
  project: "vibe-dev-squad-official",
  
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
  
  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
  
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
  
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
  
  // Hides source maps from generated client bundles
  hideSourceMaps: true,
  
  // Disable in development and when no auth token is available
  disableServerWebpackPlugin: false,
  disableClientWebpackPlugin: false,
};

// Export the appropriate configuration
export default shouldUseSentry 
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;

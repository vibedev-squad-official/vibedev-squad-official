# Sentry Integration Documentation

## Overview

Complete Sentry integration for error monitoring, performance tracking, and AI-powered debugging with both **Sentry SDK** and **Sentry MCP** components.

## 🚀 Installation Status

✅ **COMPLETED** - Full Sentry integration successfully configured

### Components Installed

1. **Sentry Next.js SDK** (`@sentry/nextjs`) - Production error tracking
2. **Sentry MCP Server** (`@sentry/mcp-server`) - AI-powered error analysis  
3. **Complete Next.js 15 Integration** - Client, server, and edge runtime support

## 📁 File Organization

### Sentry Configuration Files
```
vibedev-squad-official/
├── sentry.client.config.ts     # Client-side error tracking
├── sentry.server.config.ts     # Server-side error tracking  
├── sentry.edge.config.ts       # Edge runtime error tracking
├── instrumentation.ts          # Next.js instrumentation hook
├── next.config.ts              # Sentry webpack integration
└── .env.local                  # Environment variables
```

### Environment Variables
```bash
# Sentry SDK Configuration  
SENTRY_DSN=https://30d761876975e1bd548406d2ded7d221@o4509315986227200.ingest.us.sentry.io/4509547058888704

# Sentry Public DSN (for client-side)
NEXT_PUBLIC_SENTRY_DSN=https://30d761876975e1bd548406d2ded7d221@o4509315986227200.ingest.us.sentry.io/4509547058888704

# Sentry MCP Configuration
SENTRY_ACCESS_TOKEN=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
```

## 🔧 Configuration Details

### Project Information
- **Sentry Organization**: `sigmavue`
- **Project Name**: `vibe-dev-squad-official`
- **Project ID**: `4509547058888704`
- **Platform**: `javascript-nextjs`
- **Created**: June 23, 2025

### Key Features Enabled
- ✅ **Error Tracking** - Automatic error capture and reporting
- ✅ **Performance Monitoring** - Transaction and performance metrics
- ✅ **Session Replay** - Visual debugging with user interactions
- ✅ **Source Maps** - Readable stack traces in production
- ✅ **Environment Detection** - Production vs development modes
- ✅ **Error Filtering** - Intelligent noise reduction

## 🛠️ Usage Examples

### Manual Error Reporting
```typescript
import * as Sentry from "@sentry/nextjs";

// Capture exceptions
try {
  // risky code
} catch (error) {
  Sentry.captureException(error);
}

// Add user context
Sentry.setUser({
  id: user.id,
  email: user.email,
  username: user.username,
});

// Add custom tags
Sentry.setTag("feature", "authentication");
Sentry.setContext("user_action", {
  action: "login_attempt",
  method: "oauth",
});
```

### Performance Monitoring
```typescript
import * as Sentry from "@sentry/nextjs";

// Custom transactions
const transaction = Sentry.startTransaction({
  name: "Custom Transaction",
  op: "task",
});

// Custom spans
const span = transaction.startChild({
  op: "database",
  description: "User lookup",
});

// Complete the span and transaction
span.finish();
transaction.finish();
```

## 🤖 Sentry MCP Integration

### Available MCP Tools
- **Project Management**: List, create, and manage Sentry projects
- **Issue Analysis**: AI-powered error analysis and debugging suggestions
- **Performance Insights**: Automated performance bottleneck detection
- **Alert Configuration**: Smart alert setup and management
- **Team Collaboration**: Issue assignment and workflow automation

### Using Sentry MCP
```bash
# Test MCP server connection
SENTRY_ACCESS_TOKEN=sntryu_... npx @sentry/mcp-server@latest

# Example MCP JSON-RPC request
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

## 📊 Monitoring Dashboard

**Sentry Project URL**: https://sigmavue.sentry.io/projects/vibe-dev-squad-official/

### Key Metrics to Monitor
1. **Error Rate** - Percentage of sessions with errors
2. **Performance Score** - Web Vitals and transaction times
3. **User Satisfaction** - Apdex scores and user feedback
4. **Release Health** - Crash-free session rates

## 🔍 Best Practices

### Error Handling
- **Contextualize Errors**: Always add user context and custom data
- **Filter Noise**: Use `beforeSend` to filter out irrelevant errors
- **Error Boundaries**: Implement React error boundaries for UI errors
- **Async Error Handling**: Properly handle promise rejections

### Performance Optimization
- **Sample Rates**: Use appropriate sampling (10% production, 100% development)
- **Transaction Naming**: Use consistent, meaningful transaction names
- **Custom Metrics**: Track business-specific metrics
- **Release Tracking**: Tag errors with release versions

### Security Considerations
- **PII Data**: Never send personally identifiable information
- **Sensitive Context**: Filter out passwords, tokens, and secrets
- **Environment Variables**: Secure access tokens and DSNs
- **Source Maps**: Upload securely and hide from public bundles

## 🚨 Troubleshooting

### Common Issues
1. **Missing Instrumentation**: Ensure `instrumentation.ts` is in project root
2. **Environment Variables**: Verify DSN and tokens are correctly set
3. **Build Errors**: Check Next.js and Sentry version compatibility
4. **Source Maps**: Ensure proper webpack configuration

### Debug Mode
```typescript
// Enable debug logging in development
debug: process.env.NODE_ENV === "development"
```

### Testing Integration
```bash
# Test Next.js build with Sentry
npm run build

# Test error capturing
npm run dev
# Then trigger test errors in the application
```

## 📈 Next Steps

1. **Create Error Boundaries** - Add React error boundaries to key components
2. **Set Up Alerts** - Configure alerts for critical error thresholds
3. **Performance Budgets** - Set performance budgets and alerts
4. **User Feedback** - Implement user feedback widgets
5. **Release Tracking** - Integrate with deployment pipeline

## 🔗 Resources

- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Sentry MCP Documentation](https://docs.sentry.io/product/integrations/mcp/)
- [Next.js Instrumentation](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)

---

**Status**: ✅ Production Ready  
**Last Updated**: June 23, 2025  
**Maintained By**: Vibe Dev Squad 
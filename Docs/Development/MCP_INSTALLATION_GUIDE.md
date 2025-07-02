# MCP Installation Guide

This guide covers the installation of Model Context Protocol (MCP) servers for enhanced Claude functionality.

## Prerequisites

- Node.js and npm
- Python 3.8+ (for Python-based MCPs)
- uv (for Python-based MCPs)
- Claude CLI

## MCP Installation Commands

### 1. GitHub MCP
```bash
claude mcp add github -e GITHUB_TOKEN="your_github_personal_access_token" -- npx -y @modelcontextprotocol/server-github
```

### 2. Supabase MCP
```bash
claude mcp add supabase-mcp-server -- npx -y @supabase/mcp-server-supabase@latest --access-token your_supabase_access_token
```

### 3. DigitalOcean MCP
```bash
claude mcp add digitalocean-mcp \
  -e DIGITALOCEAN_API_TOKEN=your_do_api_token \
  -- npx "@digitalocean/mcp"
```

### 4. Web Eval Agent MCP
```bash
claude mcp add web-eval-agent -e OPERATIVE_API_KEY="your_operative_api_key" -- uvx --refresh-package webEvalAgent --from git+https://github.com/Operative-Sh/web-eval-agent.git webEvalAgent
```

### 5. Perplexity MCP
```bash
claude mcp add perplexity-ask -- uvx mcp-perplexity-ask --api-key your_perplexity_api_key
```

### 6. Sequential Thinking MCP
```bash
claude mcp add sequential-thinking -- uvx mcp-sequential-thinking
```

### 7. Context7 MCP
```bash
claude mcp add context7 -- uvx mcp-context7
```

### 8. Supermemory MCP
```bash
claude mcp add mcp-supermemory-ai -- uvx mcp-supermemory-ai
```

### 9. Playwright MCP
```bash
claude mcp add mcp-playwright -- uvx mcp-playwright
```

### 10. 21st DevMagic MCP
```bash
claude mcp add 21st-devmagic -- uvx 21st-devmagic
```

## API Key Setup

Replace the placeholder values with your actual API keys:

- **GitHub**: Generate a personal access token at https://github.com/settings/tokens
- **Supabase**: Get your access token from Supabase Dashboard
- **DigitalOcean**: Create API token at https://cloud.digitalocean.com/account/api/tokens
- **Operative**: Get API key from your Operative account
- **Perplexity**: Get API key from Perplexity AI dashboard

## Verification

After installation, verify your MCP servers:

```bash
claude mcp list
```

This should show all installed MCP servers.

## Usage

Once installed, you can use these MCPs in your Claude conversations for enhanced functionality like:

- GitHub repository management
- Supabase database operations
- DigitalOcean infrastructure management
- Web automation and testing
- Advanced search and context retrieval 
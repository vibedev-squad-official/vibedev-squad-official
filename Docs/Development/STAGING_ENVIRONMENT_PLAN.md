# Staging Environment Implementation Plan

**Phase**: 0.1 - Staging Environment Setup  
**Created**: December 2024  
**Status**: 📋 Implementation Ready

---

## **Implementation Checklist**

### **Tier 1: Research & Planning** ✅ COMPLETE
- [x] Infrastructure research using Perplexity MCP
- [x] Domain selection and DNS planning
- [x] MCP integration architecture design
- [x] Security best practices documentation
- [x] Research findings documented

### **Tier 2: DigitalOcean Infrastructure Setup** 🔄 PARTIALLY COMPLETE

#### **Infrastructure Files Created** ✅ COMPLETE
- [x] **GitHub Actions workflow** created (`.github/workflows/staging-deploy.yml`)
  - Automated testing, security scanning, and deployment pipeline
  - Environment variable handling for staging
  - Post-deployment validation and health checks
  
- [x] **Health check API endpoint** created (`src/app/api/health/route.ts`)
  - Comprehensive health monitoring
  - Supabase connectivity testing
  - Memory usage monitoring
  - Environment status reporting

- [x] **Comprehensive documentation** created
  - Manual deployment guide (`docs/development/MANUAL_DEPLOYMENT_GUIDE.md`)
  - Interactive deployment checklist (`docs/development/DEPLOYMENT_CHECKLIST.md`)
  - Tier 2 completion summary (`docs/development/PHASE_0_1_COMPLETION_SUMMARY.md`)
  - Updated staging environment plan with progress tracking

#### **Manual Setup Required** 📋 READY FOR EXECUTION
- [ ] **Purchase vibedevsquad.ai from Namecheap**
  - Domain: `vibedevsquad.ai` (primary)
  - Privacy protection: Enabled (free for life)
  - Auto-renewal: Enabled
  - Cost: ~$15-25/year
  
- [ ] **Purchase vibedevsquad.com from Namecheap** (optional)
  - Domain: `vibedevsquad.com` (redirect to .ai)
  - Privacy protection: Enabled
  - Auto-renewal: Enabled
  - Cost: ~$10-15/year

#### **DigitalOcean Account Setup**
- [ ] **Create DigitalOcean account** (if not exists)
- [ ] **Generate API token**
  - Scope: Read/Write for Droplets, App Platform, DNS
  - Store in GitHub Secrets as `DIGITALOCEAN_ACCESS_TOKEN`
- [ ] **Enable 2FA** on DigitalOcean account

#### **DigitalOcean App Platform Configuration**
- [ ] **Create new App Platform project**
  - Name: `vibedevsquad-staging`
  - Region: `nyc1` (New York - closest to team)
  - Plan: Basic ($5/month with 512MB RAM for Next.js 15)
  
- [ ] **Connect GitHub repository**
  - Repository: `vibedev-squad-official/vibedev-squad-official`
  - Branch: `main` (auto-deploy)
  - Build command: `npm run build`
  - Run command: `npm start`

#### **DNS Configuration**
- [ ] **Configure DigitalOcean DNS**
  - Add domain `vibedevsquad.ai` to DigitalOcean DNS
  - Update Namecheap nameservers to DigitalOcean
  - Create DNS records:
    ```dns
    A Record: @ → [App Platform IP]
    CNAME: staging → [App Platform staging URL]
    CNAME: www → vibedevsquad.ai
    TXT: @ → "v=spf1 include:_spf.google.com ~all" (if email needed)
    ```

### **Tier 3: Supabase Staging Database** 📋 PLANNED

#### **Staging Database Creation**
- [ ] **Create new Supabase project**
  - Name: `vibedevsquad-staging`
  - Region: `us-east-1` (closest to DigitalOcean)
  - Plan: Free tier (sufficient for staging)
  
- [ ] **Configure database schema**
  - Copy production schema to staging
  - Set up RLS policies for staging environment
  - Create staging-specific test data

#### **Environment Configuration**
- [ ] **Generate staging credentials**
  - Get staging Supabase URL
  - Get staging anonymous key
  - Get staging service role key
  - Store all in GitHub Secrets

### **Tier 4: MCP Integration** 📋 PLANNED

#### **DigitalOcean MCP Setup**
- [ ] **Install DigitalOcean MCP server**
  - Configure API token access
  - Set up automated deployment monitoring
  - Configure resource scaling alerts

#### **Supabase MCP Setup**
- [ ] **Install Supabase MCP server**
  - Configure service role access
  - Set up database monitoring
  - Configure backup automation

### **Tier 5: CI/CD Pipeline & Security** 📋 PLANNED

#### **GitHub Actions Configuration**
- [ ] **Create staging deployment workflow**
  - Trigger: Push to `main` branch
  - Steps: Test → Build → Deploy to staging
  - Environment: staging secrets
  
- [ ] **Configure environment variables**
  ```env
  NODE_ENV=staging
  NEXT_PUBLIC_SUPABASE_URL=${{ secrets.STAGING_SUPABASE_URL }}
  NEXT_PUBLIC_SUPABASE_ANON_KEY=${{ secrets.STAGING_SUPABASE_ANON_KEY }}
  SUPABASE_SERVICE_ROLE_KEY=${{ secrets.STAGING_SUPABASE_SERVICE_ROLE_KEY }}
  DIGITALOCEAN_ACCESS_TOKEN=${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
  ```

#### **Security Implementation**
- [ ] **SSL certificate configuration**
  - Let's Encrypt automatic SSL via App Platform
  - Force HTTPS for all endpoints
  - Configure HSTS headers

- [ ] **Security scanning integration**
  - Dependabot for dependency updates
  - CodeQL for static analysis
  - OWASP ZAP for dynamic testing

#### **Monitoring & Alerting**
- [ ] **DigitalOcean monitoring setup**
  - App Platform metrics monitoring
  - Resource usage alerts
  - Uptime monitoring

- [ ] **Custom monitoring**
  - Sentry for error tracking
  - Performance monitoring
  - User experience tracking

---

## **Implementation Timeline**

### **Week 1: Foundation**
- **Day 1**: Domain purchase and DigitalOcean setup
- **Day 2**: DNS configuration and SSL setup
- **Day 3**: Supabase staging database creation
- **Day 4**: Basic deployment testing
- **Day 5**: Environment variable configuration

### **Week 2: Integration & Security**
- **Day 1-2**: MCP server installation and configuration
- **Day 3-4**: CI/CD pipeline setup and testing
- **Day 5**: Security scanning and monitoring setup

### **Week 3: Testing & Validation**
- **Day 1-3**: Comprehensive testing and validation
- **Day 4**: Performance optimization
- **Day 5**: Documentation and team training

---

## **Manual Steps Required**

### **Domain Purchase Steps**
1. Go to [Namecheap.com](https://namecheap.com)
2. Search for `vibedevsquad.ai`
3. Add to cart with privacy protection
4. Complete purchase with auto-renewal enabled
5. Note: DNS propagation may take 24-48 hours

### **DigitalOcean Setup Steps**
1. Go to [DigitalOcean.com](https://digitalocean.com)
2. Create account or sign in
3. Navigate to API → Generate New Token
4. Create App Platform project
5. Connect GitHub repository
6. Configure build settings

### **Supabase Setup Steps**
1. Go to [Supabase.com](https://supabase.com)
2. Create new project for staging
3. Copy database schema from production
4. Generate and save API keys
5. Configure RLS policies

---

## **Cost Breakdown**

### **Monthly Costs**
- DigitalOcean App Platform: $5/month
- Supabase: $0/month (free tier)
- **Total Monthly**: $5/month

### **Annual Costs**
- Domain vibedevsquad.ai: ~$20/year
- Domain vibedevsquad.com: ~$15/year (optional)
- **Total Annual**: $35/year

### **Total Year 1 Cost**
- Monthly: $5 × 12 = $60
- Annual: $35
- **Total Year 1**: $95

---

## **Success Criteria**

### **Technical Validation**
- [ ] `https://staging.vibedevsquad.ai` accessible with valid SSL
- [ ] Staging database operational with authentication
- [ ] CI/CD pipeline deploying successfully from main branch
- [ ] MCP integration functional for infrastructure management
- [ ] Security scans passing with no critical vulnerabilities

### **Business Validation**
- [ ] Professional staging environment suitable for client demos
- [ ] Team can access and use staging environment effectively
- [ ] Costs within budget constraints ($10-15/month total)
- [ ] Documentation complete for team handoff
- [ ] Ready for MVP phase development and testing

---

## **Risk Mitigation**

### **Technical Risks**
1. **DNS Propagation Delays**: Allow 24-48 hours for full propagation
2. **SSL Certificate Issues**: Monitor Let's Encrypt status, have backup plan
3. **Memory Constraints**: Monitor Next.js 15 memory usage, scale if needed
4. **API Rate Limits**: Implement proper error handling and retry logic

### **Business Risks**
1. **Cost Overruns**: Set up billing alerts and usage monitoring
2. **Security Vulnerabilities**: Implement comprehensive security scanning
3. **Performance Issues**: Monitor staging performance and optimize
4. **Team Access**: Document all credentials and access procedures

---

## **Next Actions**

### **Immediate (Today)**
1. Purchase domain `vibedevsquad.ai` from Namecheap
2. Create DigitalOcean account and generate API token
3. Set up basic App Platform project

### **This Week**
1. Configure DNS and SSL certificates
2. Create Supabase staging database
3. Set up basic CI/CD pipeline

### **Next Week**
1. Implement MCP integration
2. Configure security scanning
3. Complete comprehensive testing

---

*Implementation plan based on research findings*  
*Context improved by Giga AI* 
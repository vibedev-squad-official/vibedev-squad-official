# Manual Deployment Guide - Phase 0.1

**Phase**: 0.1 - Staging Environment Setup  
**Created**: December 2024  
**Status**: 📋 Ready for Manual Execution

---

## **Prerequisites Checklist**

Before starting the manual deployment, ensure you have:

- [ ] **GitHub repository access** with admin permissions
- [ ] **Credit card** for domain purchase (~$35/year)
- [ ] **DigitalOcean account** or ability to create one
- [ ] **Supabase account** or ability to create one
- [ ] **Access to team communication** for coordination

---

## **Step 1: Domain Purchase (15 minutes)**

### **1.1 Purchase Primary Domain**
1. **Go to Namecheap**: https://namecheap.com
2. **Search for domain**: `vibedevsquad.ai`
3. **Add to cart with options**:
   - ✅ WhoisGuard (free for life)
   - ✅ Auto-renewal
   - ❌ Premium DNS (not needed, using DigitalOcean)
   - ❌ Email hosting (not needed initially)
4. **Complete purchase**: ~$15-25/year
5. **Note**: Domain activation takes 5-15 minutes

### **1.2 Purchase Secondary Domain (Optional)**
1. **Search for domain**: `vibedevsquad.com`
2. **Add to cart with same options**
3. **Complete purchase**: ~$10-15/year
4. **Purpose**: Redirect to primary .ai domain

### **1.3 Post-Purchase Setup**
1. **Access domain management**: Namecheap Dashboard → Domain List
2. **Verify ownership**: Check email for confirmation
3. **Note current nameservers**: Will change to DigitalOcean later

---

## **Step 2: DigitalOcean Account Setup (10 minutes)**

### **2.1 Create DigitalOcean Account**
1. **Go to DigitalOcean**: https://digitalocean.com
2. **Sign up** with team email
3. **Verify email** and complete profile
4. **Add payment method** (credit card required)
5. **Enable 2FA** for security

### **2.2 Generate API Token**
1. **Navigate to API**: Dashboard → API → Personal Access Tokens
2. **Generate New Token**:
   - Name: `vibedevsquad-staging-deployment`
   - Scopes: ✅ Read ✅ Write
3. **Copy token immediately** (shown only once)
4. **Store securely**: Will add to GitHub Secrets

### **2.3 Initial Account Configuration**
1. **Set up billing alerts**: Billing → Alerts
2. **Configure team access**: Account → Team (if needed)
3. **Verify account limits**: Should support App Platform

---

## **Step 3: GitHub Secrets Configuration (5 minutes)**

### **3.1 Add DigitalOcean Secrets**
1. **Go to repository**: https://github.com/vibedev-squad-official/vibedev-squad-official
2. **Navigate to**: Settings → Secrets and variables → Actions
3. **Add repository secret**:
   - Name: `DIGITALOCEAN_ACCESS_TOKEN`
   - Value: [Token from Step 2.2]

### **3.2 Prepare for Supabase Secrets**
*Note: These will be added after Supabase setup in Step 5*
- `STAGING_SUPABASE_URL`
- `STAGING_SUPABASE_ANON_KEY`
- `STAGING_SUPABASE_SERVICE_ROLE_KEY`

---

## **Step 4: DigitalOcean App Platform Setup (15 minutes)**

### **4.1 Create App Platform Project**
1. **Navigate to Apps**: Dashboard → Apps
2. **Create App** → GitHub
3. **Connect GitHub**:
   - Repository: `vibedev-squad-official/vibedev-squad-official`
   - Branch: `main`
   - Auto-deploy: ✅ Enabled

### **4.2 Configure Build Settings**
1. **Source Directory**: `/` (root)
2. **Build Command**: `npm run build`
3. **Run Command**: `npm start`
4. **Environment**: Node.js
5. **HTTP Port**: 3000

### **4.3 Configure App Settings**
1. **App Name**: `vibedevsquad-staging`
2. **Region**: `nyc1` (New York - closest to team)
3. **Plan**: Basic ($5/month)
4. **Instance Count**: 1
5. **Instance Size**: Basic (512MB RAM - sufficient for Next.js 15)

### **4.4 Environment Variables (Initial)**
Add these environment variables:
```env
NODE_ENV=staging
NEXT_PUBLIC_APP_ENV=staging
```
*Note: Supabase variables will be added after Step 5*

### **4.5 Deploy Initial Version**
1. **Review settings** and click "Create Resources"
2. **Wait for deployment** (5-10 minutes)
3. **Note the App URL**: e.g., `vibedevsquad-staging-abc123.ondigitalocean.app`
4. **Test basic functionality**: Visit URL and check health endpoint

---

## **Step 5: Supabase Staging Database Setup (10 minutes)**

### **5.1 Create Supabase Project**
1. **Go to Supabase**: https://supabase.com
2. **Create new project**:
   - Name: `vibedevsquad-staging`
   - Database Password: Generate strong password
   - Region: `us-east-1` (closest to DigitalOcean)
   - Plan: Free tier

### **5.2 Configure Database**
1. **Wait for project creation** (2-3 minutes)
2. **Access SQL Editor**: Dashboard → SQL Editor
3. **Copy production schema** (if exists) or create basic tables
4. **Set up RLS policies** for staging environment

### **5.3 Get API Credentials**
1. **Navigate to Settings**: Dashboard → Project Settings → API
2. **Copy these values**:
   - Project URL: `https://[project-id].supabase.co`
   - Anon public key: `eyJ...`
   - Service role key: `eyJ...` (keep secret)

### **5.4 Add Supabase Secrets to GitHub**
1. **Go back to GitHub**: Repository → Settings → Secrets
2. **Add these secrets**:
   - `STAGING_SUPABASE_URL`: [Project URL]
   - `STAGING_SUPABASE_ANON_KEY`: [Anon key]
   - `STAGING_SUPABASE_SERVICE_ROLE_KEY`: [Service role key]

---

## **Step 6: DNS Configuration (20 minutes)**

### **6.1 Configure DigitalOcean DNS**
1. **Navigate to Networking**: Dashboard → Networking → Domains
2. **Add Domain**: `vibedevsquad.ai`
3. **Create DNS records**:
   ```dns
   Type: A
   Hostname: @
   Value: [App Platform IP - get from App settings]
   TTL: 3600
   
   Type: CNAME
   Hostname: staging
   Value: [Full App Platform URL]
   TTL: 3600
   
   Type: CNAME
   Hostname: www
   Value: vibedevsquad.ai.
   TTL: 3600
   ```

### **6.2 Update Namecheap Nameservers**
1. **Go to Namecheap**: Dashboard → Domain List → Manage
2. **Change nameservers** to DigitalOcean:
   ```
   ns1.digitalocean.com
   ns2.digitalocean.com
   ns3.digitalocean.com
   ```
3. **Save changes**: DNS propagation takes 24-48 hours

### **6.3 Configure Custom Domain in App Platform**
1. **Go to DigitalOcean Apps**: Dashboard → Apps → vibedevsquad-staging
2. **Settings → Domains**
3. **Add domain**: `vibedevsquad.ai`
4. **Enable**: ✅ Redirect www to non-www
5. **SSL**: ✅ Automatic (Let's Encrypt)

---

## **Step 7: Final Configuration & Testing (15 minutes)**

### **7.1 Update App Platform Environment Variables**
Add the Supabase environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=[from Step 5.3]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[from Step 5.3]
SUPABASE_SERVICE_ROLE_KEY=[from Step 5.3]
```

### **7.2 Trigger Deployment**
1. **Redeploy app**: Apps → vibedevsquad-staging → Actions → Force Rebuild
2. **Monitor deployment**: Check build logs
3. **Wait for completion**: 5-10 minutes

### **7.3 Comprehensive Testing**
1. **Test App Platform URL**: `https://vibedevsquad-staging-abc123.ondigitalocean.app`
2. **Test health endpoint**: `/api/health`
3. **Test custom domain**: `https://vibedevsquad.ai` (after DNS propagation)
4. **Test staging subdomain**: `https://staging.vibedevsquad.ai`

### **7.4 Verify GitHub Actions**
1. **Make a test commit** to main branch
2. **Check Actions tab**: Should trigger staging deployment
3. **Verify auto-deployment**: Changes should appear on staging

---

## **Step 8: Documentation & Handoff (10 minutes)**

### **8.1 Update Team Documentation**
1. **Create staging access document**
2. **Document credentials** (securely)
3. **Create troubleshooting guide**

### **8.2 Team Communication**
1. **Share staging URLs**:
   - Primary: `https://vibedevsquad.ai`
   - Staging: `https://staging.vibedevsquad.ai`
   - Health: `https://vibedevsquad.ai/api/health`
2. **Share deployment process**
3. **Schedule team walkthrough**

---

## **Troubleshooting Guide**

### **Common Issues**

#### **Domain Not Resolving**
- **Check DNS propagation**: Use `nslookup vibedevsquad.ai`
- **Verify nameservers**: Should point to DigitalOcean
- **Wait time**: DNS changes take 24-48 hours

#### **App Platform Build Failing**
- **Check build logs**: Apps → Build logs
- **Verify package.json**: Ensure all dependencies listed
- **Check Node.js version**: Should be compatible with Next.js 15

#### **Supabase Connection Issues**
- **Verify environment variables**: Check spelling and values
- **Test API keys**: Use Supabase dashboard to test
- **Check CORS settings**: Ensure staging domain is allowed

#### **SSL Certificate Issues**
- **Wait for provisioning**: Let's Encrypt takes 5-10 minutes
- **Check domain validation**: Ensure DNS is properly configured
- **Force refresh**: Try incognito/private browsing

### **Rollback Procedures**

#### **If Deployment Fails**
1. **Revert to previous commit**: `git revert [commit-hash]`
2. **Push to main**: Triggers automatic redeployment
3. **Monitor deployment**: Check build logs

#### **If Domain Issues**
1. **Use App Platform URL**: Always available as fallback
2. **Check DNS settings**: Verify all records are correct
3. **Contact support**: DigitalOcean support for DNS issues

---

## **Success Criteria**

### **Deployment Successful When**
- [ ] **Domain resolves**: `https://vibedevsquad.ai` loads correctly
- [ ] **Health check passes**: `/api/health` returns 200 status
- [ ] **Auto-deployment works**: Git push triggers deployment
- [ ] **SSL certificate active**: HTTPS works without warnings
- [ ] **Supabase connected**: Database queries work in staging

### **Team Handoff Complete When**
- [ ] **Access documented**: All credentials and URLs shared
- [ ] **Process documented**: Deployment workflow explained
- [ ] **Monitoring setup**: Health checks and alerts configured
- [ ] **Team trained**: Walkthrough completed with team

---

## **Cost Summary**

### **Setup Costs**
- Domain vibedevsquad.ai: ~$20/year
- Domain vibedevsquad.com: ~$15/year (optional)

### **Monthly Costs**
- DigitalOcean App Platform: $5/month
- Supabase: $0/month (free tier)

### **Total Year 1**
- **Monthly**: $60 ($5 × 12 months)
- **Annual**: $35 (domains)
- **Total**: $95/year

---

## **Next Steps After Completion**

1. **Proceed to Tier 3**: MCP Integration setup
2. **Implement monitoring**: Sentry, performance tracking
3. **Security hardening**: Additional security measures
4. **Performance optimization**: CDN, caching strategies
5. **Team training**: Advanced deployment workflows

---

*This guide provides step-by-step instructions for manual deployment. Each step includes time estimates and troubleshooting guidance. Follow steps sequentially for best results.*

---

*Context improved by Giga AI* 
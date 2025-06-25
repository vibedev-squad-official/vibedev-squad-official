# Deployment Checklist - Phase 0.1

**Phase**: 0.1 - Staging Environment Setup  
**Date Started**: ___________  
**Completed By**: ___________  
**Status**: 🔄 In Progress

---

## **Pre-Deployment Checklist**

### **Prerequisites** ✅ READY
- [x] **GitHub repository access** with admin permissions
- [ ] **Credit card** for domain purchase (~$35/year)
- [ ] **DigitalOcean account** or ability to create one
- [ ] **Supabase account** or ability to create one
- [ ] **Team coordination** scheduled

### **Infrastructure Files** ✅ READY
- [x] **GitHub Actions workflow** created (`.github/workflows/staging-deploy.yml`)
- [x] **Health check endpoint** created (`src/app/api/health/route.ts`)
- [x] **Staging environment plan** documented
- [x] **Manual deployment guide** created

---

## **Deployment Steps**

### **Step 1: Domain Purchase** ⏱️ 15 minutes
- [ ] **1.1 Purchase vibedevsquad.ai**
  - [ ] Go to Namecheap.com
  - [ ] Search and purchase domain (~$20/year)
  - [ ] Enable WhoisGuard (free)
  - [ ] Enable auto-renewal
  - [ ] **Domain purchased at**: ___________
  
- [ ] **1.2 Purchase vibedevsquad.com** (optional)
  - [ ] Search and purchase domain (~$15/year)
  - [ ] Same settings as primary domain
  - [ ] **Domain purchased at**: ___________
  
- [ ] **1.3 Post-purchase verification**
  - [ ] Check email confirmation
  - [ ] Access domain management panel
  - [ ] Note current nameservers

**Step 1 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________

---

### **Step 2: DigitalOcean Setup** ⏱️ 10 minutes
- [ ] **2.1 Create DigitalOcean account**
  - [ ] Sign up at digitalocean.com
  - [ ] Verify email and complete profile
  - [ ] Add payment method
  - [ ] Enable 2FA for security
  
- [ ] **2.2 Generate API token**
  - [ ] Navigate to API → Personal Access Tokens
  - [ ] Generate new token with Read/Write access
  - [ ] **Token generated at**: ___________
  - [ ] Copy and store token securely
  
- [ ] **2.3 Account configuration**
  - [ ] Set up billing alerts
  - [ ] Verify account limits

**Step 2 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________

---

### **Step 3: GitHub Secrets** ⏱️ 5 minutes
- [ ] **3.1 Add DigitalOcean secrets**
  - [ ] Navigate to repo Settings → Secrets → Actions
  - [ ] Add `DIGITALOCEAN_ACCESS_TOKEN`
  - [ ] **Secret added at**: ___________
  
- [ ] **3.2 Prepare for Supabase secrets** (added later)
  - [ ] Note: Will add after Step 5

**Step 3 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________

---

### **Step 4: App Platform Setup** ⏱️ 15 minutes
- [ ] **4.1 Create App Platform project**
  - [ ] Navigate to Apps → Create App
  - [ ] Connect GitHub repository
  - [ ] Select `main` branch with auto-deploy
  
- [ ] **4.2 Configure build settings**
  - [ ] Build command: `npm run build`
  - [ ] Run command: `npm start`
  - [ ] Environment: Node.js
  - [ ] HTTP Port: 3000
  
- [ ] **4.3 Configure app settings**
  - [ ] App name: `vibedevsquad-staging`
  - [ ] Region: `nyc1` (New York)
  - [ ] Plan: Basic ($5/month)
  - [ ] Instance: Basic (512MB RAM)
  
- [ ] **4.4 Initial environment variables**
  - [ ] Add `NODE_ENV=staging`
  - [ ] Add `NEXT_PUBLIC_APP_ENV=staging`
  
- [ ] **4.5 Deploy initial version**
  - [ ] Review settings and create resources
  - [ ] Wait for deployment (5-10 minutes)
  - [ ] **App URL**: ___________________________
  - [ ] Test basic functionality

**Step 4 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________

---

### **Step 5: Supabase Database** ⏱️ 10 minutes
- [ ] **5.1 Create Supabase project**
  - [ ] Go to supabase.com
  - [ ] Create project: `vibedevsquad-staging`
  - [ ] Region: `us-east-1`
  - [ ] Plan: Free tier
  
- [ ] **5.2 Configure database**
  - [ ] Wait for project creation (2-3 minutes)
  - [ ] Access SQL Editor
  - [ ] Set up basic schema/tables
  - [ ] Configure RLS policies
  
- [ ] **5.3 Get API credentials**
  - [ ] **Project URL**: ___________________________
  - [ ] **Anon Key**: ___________________________
  - [ ] **Service Role Key**: ___________________________
  
- [ ] **5.4 Add Supabase secrets to GitHub**
  - [ ] Add `STAGING_SUPABASE_URL`
  - [ ] Add `STAGING_SUPABASE_ANON_KEY`
  - [ ] Add `STAGING_SUPABASE_SERVICE_ROLE_KEY`

**Step 5 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________

---

### **Step 6: DNS Configuration** ⏱️ 20 minutes
- [ ] **6.1 Configure DigitalOcean DNS**
  - [ ] Navigate to Networking → Domains
  - [ ] Add domain `vibedevsquad.ai`
  - [ ] Create A record: @ → App Platform IP
  - [ ] Create CNAME: staging → App Platform URL
  - [ ] Create CNAME: www → vibedevsquad.ai
  
- [ ] **6.2 Update Namecheap nameservers**
  - [ ] Change to DigitalOcean nameservers:
    - `ns1.digitalocean.com`
    - `ns2.digitalocean.com`
    - `ns3.digitalocean.com`
  - [ ] **Nameservers updated at**: ___________
  
- [ ] **6.3 Configure custom domain in App Platform**
  - [ ] Add domain `vibedevsquad.ai`
  - [ ] Enable www redirect
  - [ ] Enable automatic SSL

**Step 6 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________  
**Note**: DNS propagation takes 24-48 hours

---

### **Step 7: Final Configuration** ⏱️ 15 minutes
- [ ] **7.1 Update App Platform environment variables**
  - [ ] Add Supabase URL
  - [ ] Add Supabase anon key
  - [ ] Add Supabase service role key
  
- [ ] **7.2 Trigger deployment**
  - [ ] Force rebuild in App Platform
  - [ ] Monitor deployment logs
  - [ ] Wait for completion (5-10 minutes)
  
- [ ] **7.3 Comprehensive testing**
  - [ ] Test App Platform URL
  - [ ] Test health endpoint `/api/health`
  - [ ] Test custom domain (after DNS propagation)
  - [ ] Test staging subdomain
  
- [ ] **7.4 Verify GitHub Actions**
  - [ ] Make test commit to main
  - [ ] Check Actions tab for deployment
  - [ ] Verify auto-deployment works

**Step 7 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________

---

### **Step 8: Documentation & Handoff** ⏱️ 10 minutes
- [ ] **8.1 Update team documentation**
  - [ ] Create staging access document
  - [ ] Document credentials securely
  - [ ] Create troubleshooting guide
  
- [ ] **8.2 Team communication**
  - [ ] Share staging URLs with team
  - [ ] Document deployment process
  - [ ] Schedule team walkthrough

**Step 8 Status**: ⏳ Not Started | 🔄 In Progress | ✅ Complete  
**Completed at**: ___________

---

## **Testing & Validation**

### **Functional Testing**
- [ ] **Health endpoint responds** (`/api/health`)
  - [ ] Returns 200 status
  - [ ] Shows environment: staging
  - [ ] Database connection: healthy
  
- [ ] **Domain resolution**
  - [ ] `https://vibedevsquad.ai` loads
  - [ ] `https://staging.vibedevsquad.ai` loads
  - [ ] SSL certificate is valid
  
- [ ] **Auto-deployment**
  - [ ] Git push triggers deployment
  - [ ] Changes appear on staging
  - [ ] Build logs show success

### **Performance Testing**
- [ ] **Load time** < 3 seconds
- [ ] **Memory usage** < 400MB
- [ ] **Build time** < 5 minutes

### **Security Testing**
- [ ] **HTTPS enforced** (no HTTP access)
- [ ] **Headers** include security policies
- [ ] **Secrets** not exposed in client code

---

## **Issue Tracking**

### **Issues Encountered**
| Issue | Description | Resolution | Time Lost |
|-------|-------------|------------|-----------|
| 1. | | | |
| 2. | | | |
| 3. | | | |

### **Rollback Actions Taken**
- [ ] **No rollbacks needed**
- [ ] **Rollback performed**: ___________
  - Reason: ___________
  - Actions: ___________

---

## **Final Validation**

### **Deployment Success Criteria**
- [ ] **Domain resolves**: `https://vibedevsquad.ai` loads correctly
- [ ] **Health check passes**: `/api/health` returns 200 status
- [ ] **Auto-deployment works**: Git push triggers deployment
- [ ] **SSL certificate active**: HTTPS works without warnings
- [ ] **Supabase connected**: Database queries work in staging

### **Team Handoff Criteria**
- [ ] **Access documented**: All credentials and URLs shared
- [ ] **Process documented**: Deployment workflow explained
- [ ] **Monitoring setup**: Health checks and alerts configured
- [ ] **Team trained**: Walkthrough completed with team

---

## **Cost Tracking**

### **Actual Costs**
- **vibedevsquad.ai domain**: $_______ (budgeted: ~$20)
- **vibedevsquad.com domain**: $_______ (budgeted: ~$15, optional)
- **DigitalOcean App Platform**: $5/month (as expected)
- **Supabase**: $0/month (free tier, as expected)

### **Total Actual Cost**
- **Setup**: $_______ (budgeted: $35)
- **Monthly**: $5 (as budgeted)
- **Year 1 Total**: $_______ (budgeted: $95)

---

## **Next Steps**

### **Immediate (Post-Deployment)**
- [ ] **Monitor deployment** for 24 hours
- [ ] **Test all functionality** thoroughly
- [ ] **Document any issues** and resolutions

### **Short-term (1 week)**
- [ ] **Proceed to Tier 3**: MCP Integration setup
- [ ] **Implement monitoring**: Sentry, performance tracking
- [ ] **Team training**: Advanced deployment workflows

### **Medium-term (1 month)**
- [ ] **Security hardening**: Additional security measures
- [ ] **Performance optimization**: CDN, caching strategies
- [ ] **Backup procedures**: Database and deployment backups

---

## **Sign-off**

### **Technical Validation**
**Completed by**: ___________  
**Date**: ___________  
**Signature**: ___________

### **Team Lead Approval**
**Approved by**: ___________  
**Date**: ___________  
**Signature**: ___________

---

*This checklist tracks the complete deployment process for Phase 0.1. Check off items as completed and note any issues or deviations from the plan.*

---

*Context improved by Giga AI* 
# Staging Environment Setup - Next Steps

## **Current Status ✅**
- [x] DigitalOcean CLI installed and authenticated
- [x] DigitalOcean MCP server removed (using CLI instead)
- [x] App specification file created (`staging-app-spec.yaml`)
- [x] DNS configuration plan documented
- [x] DigitalOcean account verified (sigmaalgo@gmail.com)

## **Immediate Next Steps**

### **Step 1: Complete GitHub Integration (Required)**
**Issue:** GitHub user not authenticated with DigitalOcean

**Action Required:**
1. Visit: https://cloud.digitalocean.com/apps/github/install
2. Click "Install & Authorize" 
3. Select repositories to authorize (include `vibedev-squad-official`)
4. Complete the authorization process

**Alternative:** Create app via DigitalOcean Control Panel:
1. Log into https://cloud.digitalocean.com/
2. Navigate to Apps → Create App
3. Choose GitHub as source
4. Select `vibedev-squad-official` repository
5. Configure deployment settings as per our spec

### **Step 2: Domain Purchase & Verification**
**Status:** Pending - Need to complete Subtask 2.1

**Required Actions:**
1. **Research Domain Availability:**
   - Check `vibedevsquad.ai` availability on Namecheap
   - Check `vibedevsquad.com` availability on Namecheap
   - Compare pricing and features

2. **Purchase Domains:**
   - Purchase `vibedevsquad.ai` (primary AI-focused domain)
   - Purchase `vibedevsquad.com` (secondary for redirects)
   - Enable WhoisGuard privacy protection

3. **Domain Verification:**
   - Verify domain registration details
   - Confirm DNS management access

### **Step 3: DigitalOcean App Platform Creation**
**Once GitHub is connected:**

1. **Create App Using CLI:**
   ```bash
   doctl apps create --spec staging-app-spec.yaml
   ```

2. **Monitor Deployment:**
   ```bash
   doctl apps list
   doctl apps get <app-id>
   ```

3. **Retrieve DNS Values:**
   ```bash
   # Get app details including domain/IP information
   doctl apps get <app-id> --format yaml
   ```

### **Step 4: DNS Configuration in Namecheap**
**After App Platform is created and domain is purchased:**

1. **Access Namecheap DNS Management:**
   - Log into Namecheap account
   - Navigate to Domain List → Manage → Advanced DNS

2. **Configure DNS Records:**
   ```
   # Production domain (@)
   Type: A Record
   Host: @
   Value: [DigitalOcean App Platform IP]
   TTL: Automatic

   # WWW subdomain
   Type: CNAME Record  
   Host: www
   Value: vibedevsquad.ai
   TTL: Automatic

   # Staging subdomain (key for this phase)
   Type: CNAME Record
   Host: staging  
   Value: [DigitalOcean App Platform CNAME]
   TTL: Automatic
   ```

3. **Save and Verify:**
   - Save DNS configuration
   - Wait for propagation (1-24 hours)
   - Test with DNS checkers

### **Step 5: SSL and Custom Domain Setup**
**After DNS propagation:**

1. **Add Custom Domain to App Platform:**
   ```bash
   # Via CLI or DigitalOcean control panel
   # Add staging.vibedevsquad.ai as custom domain
   ```

2. **Verify SSL Certificate:**
   - Let's Encrypt will automatically generate SSL
   - Verify HTTPS access works
   - Test redirect functionality

## **Expected DNS Values Format**

Once the App Platform is created, you'll get values like:
```
App Platform URL: vibe-devsquad-staging-<hash>.ondigitalocean.app
CNAME Target: vibe-devsquad-staging-<hash>.ondigitalocean.app
IP Address: [Specific IP from DigitalOcean]
```

## **Verification Checklist**

### **Pre-Launch:**
- [ ] GitHub integration completed
- [ ] Domain purchased and verified
- [ ] App Platform application created
- [ ] DNS records configured
- [ ] SSL certificate active

### **Post-Launch:**
- [ ] `https://staging.vibedevsquad.ai` accessible
- [ ] SSL certificate valid (green lock)
- [ ] Application loads correctly
- [ ] Environment variables working
- [ ] GitHub auto-deploy functional

## **Troubleshooting Common Issues**

### **GitHub Integration Issues:**
- **Problem:** Repository not showing up
- **Solution:** Ensure repository is public or GitHub integration has proper permissions

### **DNS Propagation Issues:**
- **Problem:** Domain not resolving
- **Solution:** Wait 24-48 hours, check TTL settings, verify records are correct

### **SSL Certificate Issues:**
- **Problem:** SSL not generating
- **Solution:** Verify DNS is pointing correctly, wait for automatic generation

## **Files Created/Modified**
- ✅ `staging-app-spec.yaml` - App Platform specification
- ✅ `Docs/Development/DNS_CONFIGURATION_PLAN.md` - DNS planning document
- ✅ `Docs/Development/STAGING_SETUP_NEXT_STEPS.md` - This guide

## **Resources & Links**
- DigitalOcean GitHub Integration: https://cloud.digitalocean.com/apps/github/install
- Namecheap Domain Purchase: https://www.namecheap.com/
- DNS Checker Tools: https://dnschecker.org/, https://www.whatsmydns.net/
- DigitalOcean Control Panel: https://cloud.digitalocean.com/

---

**Next Action:** Complete GitHub integration, then proceed with domain purchase and app creation. 
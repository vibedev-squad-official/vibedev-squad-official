# DNS Configuration Plan - Vibe DevSquad Staging

## **Domain Strategy**
- **Primary Production Domain**: `vibedevsquad.ai` (AI-focused branding)
- **Secondary Domain**: `vibedevsquad.com` (redirect to .ai)
- **Staging Subdomain**: `staging.vibedevsquad.ai`

## **Required DNS Records Structure**

### **Production Domain (vibedevsquad.ai)**
```
Type: A Record
Host: @
Value: [TO BE UPDATED: DigitalOcean App Platform IP]
TTL: Automatic

Type: CNAME Record
Host: www
Value: vibedevsquad.ai
TTL: Automatic
```

### **Staging Environment (staging.vibedevsquad.ai)**
```
Type: CNAME Record
Host: staging
Value: [TO BE UPDATED: DigitalOcean App Platform CNAME]
TTL: Automatic
```

### **Email & Additional Services (Optional)**
```
Type: MX Record
Host: @
Value: [TO BE CONFIGURED: Email service if needed]
Priority: 10
TTL: Automatic

Type: TXT Record
Host: @
Value: [TO BE CONFIGURED: Domain verification records]
TTL: Automatic
```

## **DNS Configuration Steps**

### **Phase 1: Domain Purchase & Initial Setup**
1. Research domain availability for both `.ai` and `.com` variants
2. Purchase domains through Namecheap
3. Enable WhoisGuard privacy protection
4. Verify domain ownership

### **Phase 2: DigitalOcean App Platform Setup**
1. Create App Platform application using doctl CLI
2. Configure GitHub integration for automatic deployments
3. Retrieve App Platform CNAME and IP addresses
4. Document connection details

### **Phase 3: DNS Record Configuration**
1. Access Namecheap Advanced DNS management
2. Configure DNS records with DigitalOcean values
3. Set up staging subdomain CNAME
4. Configure www redirect

### **Phase 4: SSL & Verification**
1. Verify SSL certificate generation (automatic via Let's Encrypt)
2. Test domain accessibility and HTTPS redirect
3. Validate DNS propagation across multiple regions

## **DNS Propagation Monitoring**

### **Tools for DNS Checking:**
- https://dnschecker.org/
- https://www.whatsmydns.net/
- https://mxtoolbox.com/SuperTool.aspx

### **Expected Propagation Times:**
- A Records: 1-24 hours
- CNAME Records: 1-24 hours
- MX Records: 1-48 hours

## **Security Considerations**

### **DNS Security Best Practices:**
- Enable DNSSEC if supported by Namecheap
- Use strong, unique passwords for domain management
- Enable two-factor authentication on Namecheap account
- Regularly monitor DNS records for unauthorized changes

## **Configuration Status Tracking**

### **Domain Purchase Status:**
- [ ] vibedevsquad.ai purchased
- [ ] vibedevsquad.com purchased
- [ ] WhoisGuard privacy protection enabled
- [ ] Domain ownership verified

### **DNS Configuration Status:**
- [ ] Namecheap Advanced DNS accessed
- [ ] DNS record structure prepared
- [ ] DigitalOcean App Platform values obtained
- [ ] DNS records configured and saved
- [ ] DNS propagation verified

### **DigitalOcean Integration Status:**
- [ ] App Platform application created
- [ ] GitHub integration configured
- [ ] Custom domain added to App Platform
- [ ] SSL certificate verified
- [ ] Staging URL tested and functional

## **Troubleshooting Guide**

### **Common DNS Issues:**
1. **DNS Not Propagating**: Wait 24-48 hours, check TTL settings
2. **SSL Certificate Issues**: Verify DNS records are correct, wait for auto-generation
3. **CNAME Conflicts**: Ensure no conflicting A records for the same host
4. **Subdomain Not Resolving**: Verify CNAME record points to correct target

### **Emergency Rollback Plan:**
1. Keep backup of original DNS settings
2. Document all changes with timestamps
3. Have rollback DNS configuration ready
4. Monitor uptime and accessibility continuously

---

*This document will be updated as we progress through the DNS configuration process.* 
# External Requirements - Items Nick Needs to Provide

> **Last Updated:** January 20, 2026  
> These are items that Claude Code cannot create and must be provided by you.

---

## Priority 1: Required Before Development

### AWS Credentials
- [ ] **AWS Account Access**
  - Either AWS Console access OR
  - AWS CLI configured with credentials
  - Needed for: Lambda, API Gateway, SES setup
  
### Email Verification
- [ ] **Verify nick@itprodirect.com in AWS SES**
  - Required before email sending will work
  - AWS sends verification email, click the link

---

## Priority 2: Required Before Testing

### Environment Variables
- [ ] **AWS API Gateway URL** (after creating API)
  - Format: `https://XXXXXX.execute-api.us-east-1.amazonaws.com/prod`
  - Goes in `.env.local` file

---

## Priority 3: Required Before Go-Live

### Product Images

**Guidelines for best results:**

1. **Main product shot** (required for each product)
   - Clean background (white/neutral preferred)
   - Good lighting (natural light or well-lit room)
   - Product fills ~70% of frame
   - Resolution: 1200x1200px minimum (square crop works best)
   - File format: JPG or PNG

2. **Detail shots** (optional but recommended)
   - Ports/connectors closeup
   - Labels/model numbers visible
   - Condition details (if any wear)
   - Include something for scale if helpful

3. **For NEW/SEALED items**
   - Photo of sealed box/packaging
   - Shows "unopened" status clearly

4. **File naming convention:**
   ```
   public/images/products/[sku-folder]/
   ├── main.jpg       # Primary image
   ├── side.jpg       # Side view
   ├── ports.jpg      # Ports/connectors
   ├── box.jpg        # Packaging (if applicable)
   └── detail-1.jpg   # Additional details
   ```

**Products needing images:**

| SKU | Product | Suggested Shots |
|-----|---------|-----------------|
| RocketM5-US | Ubiquiti RocketM5 | main, ports, multiple-units |
| RP-5AC-Gen2-US | Rocket Prism 5AC Gen2 | main, detail |
| AM-5G20-90 | airMAX Sector Antenna | main, mounting-bracket, size-reference |
| PBE-5AC-Gen2-US | PowerBeam AC Gen2 | main, sealed-box |
| MA-INJ-4 | Meraki PoE Injector | main |

### Payment Information

For the checkout confirmation emails, you'll need to provide:

- [ ] **Wire Transfer Details**
  ```
  Bank Name: [Your Bank]
  Routing Number: [XXXXXXXXX]
  Account Number: [XXXXXXXXX]
  Account Name: [IT Pro Direct / Your Name]
  ```

- [ ] **ACH Details** (usually same as wire, confirm with bank)

- [ ] **PayPal Email**
  - Confirm: nick@itprodirect.com for receiving PayPal payments
  - Or different PayPal email if preferred

### Final Inventory Count

Before go-live, verify actual quantities:

| Product | Listed Qty | Actual Qty | Notes |
|---------|------------|------------|-------|
| RocketM5-US | 20 | ___ | |
| RP-5AC-Gen2-US | 20 | ___ | |
| AM-5G20-90 | 18 | ___ | |
| PBE-5AC-Gen2-US | 2 | ___ | |
| MA-INJ-4 | 15 | ___ | |

---

## Priority 4: Optional / Nice-to-Have

### Google Analytics
- [ ] **GA4 Property ID** (if you want analytics)
  - Format: `G-XXXXXXXXXX`
  - Create at analytics.google.com

### Custom Domain (Future)
- [ ] **Domain name** if you want something other than Vercel subdomain
  - Could use subdomain of itprodirect.com (e.g., `gear.itprodirect.com`)
  - Or register new domain

### Social/Marketing
- [ ] **Social media links** (if you want in footer)
- [ ] **Logo file** (if IT Pro Direct has one)

---

## Quick Checklist

Copy this to track your progress:

```
[ ] AWS account ready
[ ] SES email verified
[ ] API Gateway URL obtained
[ ] Wire transfer details ready
[ ] PayPal email confirmed
[ ] Product photos taken:
    [ ] RocketM5
    [ ] Rocket Prism
    [ ] Sector Antennas
    [ ] PowerBeam
    [ ] Meraki PoE
[ ] Final inventory counts verified
```

---

## Notes

- **Images can be added after initial deployment** - the site will show placeholders until you add real images
- **Payment details can be updated in Lambda code** after initial deployment
- **Inventory counts can be updated in products.json** anytime

The site can go live with placeholders and be updated incrementally!

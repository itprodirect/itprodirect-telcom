# External Requirements - Items Nick Needs to Provide

> **Last Updated:** January 22, 2026
> These are items that Claude Code cannot create and must be provided by you.

---

## Already Complete

### AWS Setup
- [x] **AWS Account configured**
- [x] **Lambda functions deployed** (itprodirect-contact, itprodirect-orders)
- [x] **API Gateway HTTP API created** with CORS enabled
- [x] **SES email verified** (nick@itprodirect.com)

### Vercel Setup
- [x] **Vercel account connected to GitHub**
- [x] **Auto-deploy working**

---

## Required Before Order Flow Testing

### Environment Variable
- [ ] **Set NEXT_PUBLIC_API_URL in Vercel dashboard**
  - Go to Vercel → Project Settings → Environment Variables
  - Add: `NEXT_PUBLIC_API_URL` = `https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com`
  - Redeploy after adding

---

## Required Before Go-Live

### Product Images

**Guidelines for best results:**

1. **Main product shot** (required for each product)
   - Clean background (white/neutral preferred)
   - Good lighting
   - Resolution: 1200x1200px minimum (square crop works best)
   - File format: JPG or PNG

2. **File naming:**
   ```
   public/images/products/[sku-folder]/
   ├── main.jpg       # Primary image
   ├── side.jpg       # Side view (optional)
   └── detail.jpg     # Details (optional)
   ```

**Products needing images:**

| SKU | Product | Priority |
|-----|---------|----------|
| RocketM5-US | Ubiquiti RocketM5 | High (featured) |
| RP-5AC-Gen2-US | Rocket Prism 5AC Gen2 | High (featured) |
| AM-5G20-90 | airMAX Sector Antenna | Medium |
| PBE-5AC-Gen2-US | PowerBeam AC Gen2 | High (featured) |
| MA-INJ-4 | Meraki PoE Injector | Low |

### Final Inventory Count

Before go-live, verify actual quantities match products.json:

| Product | Listed Qty | Actual Qty |
|---------|------------|------------|
| RocketM5-US | 20 | ___ |
| RP-5AC-Gen2-US | 20 | ___ |
| AM-5G20-90 | 18 | ___ |
| PBE-5AC-Gen2-US | 2 | ___ |
| MA-INJ-4 | 15 | ___ |

---

## Optional / Nice-to-Have

### Google Analytics
- [ ] **GA4 Property ID** (format: `G-XXXXXXXXXX`)
  - Create at analytics.google.com
  - Add to Vercel env vars as `NEXT_PUBLIC_GA_ID`

### Custom Domain
- [ ] **Domain name** (future enhancement)
  - Could use subdomain of itprodirect.com
  - Or register new domain

---

## Quick Checklist

```
[x] AWS Lambda functions working
[x] API Gateway working
[x] SES email verified
[x] Vercel connected
[ ] NEXT_PUBLIC_API_URL set in Vercel
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

- **Images can be added incrementally** - site works with placeholders
- **Inventory counts can be updated** in `data/products.json` anytime
- **Payment info not needed on website** - handled offline after customer contact

The site can go live with placeholders and be updated over time!

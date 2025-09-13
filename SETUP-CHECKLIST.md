# 🚀 SYMBI Postman & Frontegg Setup Checklist

## ✅ Current Status

Based on the setup verification, here's what's ready:

- ✅ **Local Server**: Running on http://localhost:3000
- ✅ **Postman Collection**: SYMBI X Agent API (5 request folders)
- ✅ **Environment Template**: 18 variables defined
- ✅ **Authentication System**: Frontegg integration code ready
- ❌ **Environment Variables**: Need actual credentials
- ❌ **Frontegg Connection**: Requires setup

## 🔧 Next Steps (In Order)

### 1. Set Up Frontegg Account

**Action Required**: Create and configure your Frontegg application

1. **Sign up at [Frontegg Console](https://portal.frontegg.com)**
2. **Create Application**:
   - Name: `SYMBI X Agent`
   - Type: Web Application
   - Allowed Origins: `http://localhost:3000`, `https://symbi.world`

3. **Configure Roles** (Authorization → Roles):
   ```
   social.viewer     - Read-only access
   social.reviewer   - Can review content
   social.publisher  - Can publish content
   social.admin      - Full administrative access
   symbi.agent       - Autonomous agent operations
   ```

4. **Create M2M Client** (Authentication → Machine to Machine):
   - Name: `symbi-x-agent`
   - Scopes: `social:read`, `social:write`, `agent:operate`

5. **Add Secrets** (Integrations → Secrets Management):
   - `X_API_CLIENT_ID`
   - `X_API_CLIENT_SECRET`
   - `X_API_ACCESS_TOKEN`
   - `X_API_REFRESH_TOKEN`
   - `X_API_BEARER_TOKEN`

### 2. Update Environment Variables

**Action Required**: Replace placeholder values in `.env.local`

```bash
# Update these values with your actual Frontegg credentials:
FRONTEGG_BASE_URL=https://[your-subdomain].frontegg.com
FRONTEGG_CLIENT_ID=[your-frontegg-client-id]
FRONTEGG_API_KEY=[your-frontegg-api-key]

# Update M2M credentials:
SYMBI_M2M_CLIENT_ID=[your-m2m-client-id]
SYMBI_M2M_CLIENT_SECRET=[your-m2m-client-secret]

# Update X API credentials:
X_API_CLIENT_ID=[your-x-api-client-id]
X_API_CLIENT_SECRET=[your-x-api-client-secret]
X_API_ACCESS_TOKEN=[your-x-access-token]
X_API_REFRESH_TOKEN=[your-x-refresh-token]
X_API_BEARER_TOKEN=[your-x-bearer-token]
```

### 3. Set Up Postman

**Action Required**: Import and configure Postman collection

1. **Import Collection**:
   - Open Postman
   - Import `/postman/SYMBI-X-Agent-API.postman_collection.json`

2. **Import Environment**:
   - Import `/postman/SYMBI-Environment-Template.postman_environment.json`
   - Update variables with your actual credentials

3. **Add Pre-request Script**:
   - Copy content from `/postman/frontegg-auth-script.js`
   - Add to Collection → Pre-request Script tab

### 4. Test Your Setup

**Action Required**: Verify everything works

```bash
# 1. Restart your development server
npm run dev

# 2. Test the setup (after updating .env.local)
# Note: You'll need to install dotenv for this to work:
npm install dotenv

# 3. Test in Postman:
# - Get M2M Token (should auto-generate)
# - Test Agent Status
# - Test X API Connection
```

## 📋 Verification Commands

```bash
# Check if server is running
curl http://localhost:3000/api/symbi/agent
# Expected: 401 Unauthorized (authentication required)

# Test Frontegg JWKS endpoint (replace with your URL)
curl https://your-subdomain.frontegg.com/.well-known/jwks_json
# Expected: JSON with signing keys

# Test M2M token generation (in Postman)
POST https://your-subdomain.frontegg.com/oauth/token
Body: {
  "grant_type": "client_credentials",
  "client_id": "your-m2m-client-id",
  "client_secret": "your-m2m-client-secret"
}
```

## 🔒 Security Checklist

- [ ] Never commit actual credentials to git
- [ ] Use Frontegg Secrets for production X API tokens
- [ ] Enable MFA for `social.admin` role
- [ ] Rotate tokens every 30-90 days
- [ ] Use least privilege principle for roles
- [ ] Monitor API usage and rate limits

## 🚨 Troubleshooting

### "Invalid Frontegg token"
- Check token expiry (24 hours default)
- Verify M2M client has correct scopes
- Ensure client ID/secret are correct

### "X API authentication failed"
- Verify X API credentials in Frontegg secrets
- Check X app has read + write permissions
- Ensure using user context tokens (not just app tokens)

### "CORS errors"
- Add your domain to Frontegg allowed origins
- Check NEXT_PUBLIC_ environment variables

### "Server not accessible"
- Ensure `npm run dev` is running
- Check port 3000 is not blocked
- Verify no other services using port 3000

## 📚 Documentation References

- **Setup Guide**: `/docs/postman-frontegg-setup-guide.md`
- **API Integration Plan**: `/docs/api-integration-plan.md`
- **Overseer Policy**: `/config/overseer-policy.json`
- **Postman Collection**: `/postman/SYMBI-X-Agent-API.postman_collection.json`

## 🎯 Success Criteria

You'll know the setup is complete when:

1. ✅ Postman can get Frontegg M2M tokens automatically
2. ✅ Agent Status API returns 200 with valid token
3. ✅ X API connection test passes
4. ✅ You can post test tweets through the API
5. ✅ Overseer policies are enforced

---

**Ready to proceed?** Start with Step 1 (Frontegg Account Setup) and work through each step in order. The setup verification script will help you track progress.

**Need help?** Check the troubleshooting section or review the detailed setup guide at `/docs/postman-frontegg-setup-guide.md`.
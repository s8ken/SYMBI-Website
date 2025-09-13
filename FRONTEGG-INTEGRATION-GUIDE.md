# 🔗 SYMBI Agent Frontegg Integration Guide

## ✅ Great News!

Since you've already created a SYMBI agent in Frontegg, you're ahead of the game! Let's connect it to your local development environment.

## 🔍 What You Need from Your Frontegg Console

### 1. Application Settings

In your Frontegg console, go to **Settings → General**:

```bash
# Replace these in your .env.local:
FRONTEGG_BASE_URL=https://[your-subdomain].frontegg.com
FRONTEGG_CLIENT_ID=[your-actual-client-id]
FRONTEGG_API_KEY=[your-actual-api-key]

# Client-side variables:
NEXT_PUBLIC_FRONTEGG_BASE_URL=https://[your-subdomain].frontegg.com
NEXT_PUBLIC_FRONTEGG_CLIENT_ID=[your-actual-client-id]
```

**Where to find these:**
- **Base URL**: Your Frontegg subdomain (e.g., `https://symbi-demo.frontegg.com`)
- **Client ID**: Settings → General → Client ID
- **API Key**: Settings → General → API Key

### 2. Machine-to-Machine (M2M) Client

Go to **Authentication → Machine to Machine**:

```bash
# Replace these in your .env.local:
SYMBI_M2M_CLIENT_ID=[your-m2m-client-id]
SYMBI_M2M_CLIENT_SECRET=[your-m2m-client-secret]
```

**If you don't have an M2M client yet:**
1. Click "Add Client"
2. Name: `symbi-x-agent`
3. Scopes: `social:read`, `social:write`, `agent:operate`
4. Save and copy the Client ID and Secret

### 3. Roles Configuration

Go to **Authorization → Roles** and ensure you have:

- `social.viewer` - Read-only access
- `social.reviewer` - Can review content
- `social.publisher` - Can publish content
- `social.admin` - Full administrative access
- `symbi.agent` - Autonomous agent operations

**If missing, create them:**
1. Click "Add Role"
2. Enter role name and description
3. Assign appropriate permissions

### 4. X API Credentials (Optional but Recommended)

Go to **Integrations → Secrets Management** and add:

- `X_API_CLIENT_ID`
- `X_API_CLIENT_SECRET`
- `X_API_ACCESS_TOKEN`
- `X_API_REFRESH_TOKEN`
- `X_API_BEARER_TOKEN`

## 🔧 Quick Setup Steps

### Step 1: Update Environment Variables

1. Open your `.env.local` file
2. Replace the demo values with your actual Frontegg credentials:

```bash
# FROM (current demo values):
FRONTEGG_BASE_URL=https://app-demo.frontegg.com
FRONTEGG_CLIENT_ID=demo-client-id
FRONTEGG_API_KEY=demo-api-key

# TO (your actual values):
FRONTEGG_BASE_URL=https://[your-subdomain].frontegg.com
FRONTEGG_CLIENT_ID=[your-actual-client-id]
FRONTEGG_API_KEY=[your-actual-api-key]
```

### Step 2: Test the Connection

```bash
# Restart your development server
npm run dev

# Test the Frontegg connection
curl https://[your-subdomain].frontegg.com/.well-known/jwks_json
# Should return JSON with signing keys
```

### Step 3: Test M2M Authentication

In Postman or curl:

```bash
POST https://[your-subdomain].frontegg.com/oauth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "your-m2m-client-id",
  "client_secret": "your-m2m-client-secret"
}
```

**Expected Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

### Step 4: Test SYMBI Agent API

```bash
# Test without authentication (should return 401)
curl http://localhost:3000/api/symbi/agent

# Test with M2M token (should return agent status)
curl -H "Authorization: Bearer [your-m2m-token]" \
     http://localhost:3000/api/symbi/agent
```

## 🚀 Postman Setup

### Import and Configure

1. **Import Collection**: `/postman/SYMBI-X-Agent-API.postman_collection.json`
2. **Import Environment**: `/postman/SYMBI-Environment-Template.postman_environment.json`
3. **Update Environment Variables**:
   - `frontegg_base_url`: Your Frontegg base URL
   - `frontegg_client_id`: Your M2M client ID
   - `frontegg_client_secret`: Your M2M client secret
   - `base_url`: `http://localhost:3000`

### Add Auto-Authentication

1. Go to Collection → Pre-request Script
2. Copy content from `/postman/frontegg-auth-script.js`
3. Paste and save

Now your Postman requests will automatically get fresh M2M tokens!

## ✅ Verification Checklist

- [ ] Updated `.env.local` with actual Frontegg credentials
- [ ] Created M2M client in Frontegg console
- [ ] Configured required roles (`symbi.agent`, `social.publisher`, etc.)
- [ ] Tested M2M token generation
- [ ] Imported Postman collection and environment
- [ ] Added pre-request script for auto-authentication
- [ ] Successfully called SYMBI agent API with authentication

## 🔍 Quick Verification

Run this command to test your setup:

```bash
node scripts/test-setup.js
```

You should see:
- ✅ Environment Variables
- ✅ Local Server
- ✅ Frontegg Connection
- ✅ Postman Collection

## 🚨 Common Issues

### "Invalid client credentials"
- Double-check your M2M Client ID and Secret
- Ensure the M2M client is enabled in Frontegg

### "CORS errors"
- Add `http://localhost:3000` to Frontegg allowed origins
- Check both App URL and Base URL settings

### "Token validation failed"
- Verify your Frontegg Base URL is correct
- Check that JWKS endpoint is accessible

## 🎯 Next Steps

Once everything is working:

1. **Add X API credentials** to Frontegg secrets
2. **Test autonomous posting** through the agent API
3. **Configure Overseer policies** for content governance
4. **Set up monitoring** and analytics

---

**Need help?** Check the detailed setup guide at `/docs/postman-frontegg-setup-guide.md` or the troubleshooting section in `/SETUP-CHECKLIST.md`.

**Ready to test?** Your SYMBI agent is waiting at http://localhost:3000/symbi/agent! 🚀
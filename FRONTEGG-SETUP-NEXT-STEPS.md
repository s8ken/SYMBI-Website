# 🔧 SYMBI Frontegg Setup - Next Steps

## ✅ Current Status

Your environment is now configured with your Frontegg credentials:
- **Base URL**: `https://app-vs8b106vhrxc.frontegg.com`
- **Client ID**: `2ebc287c-c29c-4d52-af77-5c899d8f8762`
- **API Key**: `469e9b18-18b6-4694-8d53-23b6d92461ca`

## 🚨 Required Actions in Frontegg Console

To complete the setup, you need to configure a few things in your Frontegg console:

### 1. Create Machine-to-Machine (M2M) Client

**Go to**: [Authentication → Machine to Machine](https://app-vs8b106vhrxc.frontegg.com/development/authentication/machine-to-machine)

1. **Click "Add Client"**
2. **Client Name**: `symbi-x-agent`
3. **Description**: `SYMBI autonomous agent for X API integration`
4. **Scopes**: Add these custom scopes:
   - `social:read` - Read social media content
   - `social:write` - Post and manage social media content
   - `agent:operate` - Autonomous agent operations
   - `content:review` - Review and moderate content

5. **Save and copy the credentials**:
   - Client ID → Update `SYMBI_M2M_CLIENT_ID` in `.env.local`
   - Client Secret → Update `SYMBI_M2M_CLIENT_SECRET` in `.env.local`

### 2. Configure Roles & Permissions

**Go to**: [Authorization → Roles](https://app-vs8b106vhrxc.frontegg.com/development/authorization/roles)

**Create these roles**:

#### `social.viewer`
- **Description**: Read-only access to social content
- **Permissions**: `social:read`

#### `social.publisher`
- **Description**: Can create and publish social content
- **Permissions**: `social:read`, `social:write`

#### `social.admin`
- **Description**: Full administrative access
- **Permissions**: `social:read`, `social:write`, `content:review`

#### `symbi.agent`
- **Description**: Autonomous agent with operational permissions
- **Permissions**: `social:read`, `social:write`, `agent:operate`, `content:review`

### 3. Set Up Secrets Management (Optional but Recommended)

**Go to**: [Integrations → Secrets Management](https://app-vs8b106vhrxc.frontegg.com/development/integrations/secrets)

**Add these secrets for X API**:
- `X_API_CLIENT_ID`
- `X_API_CLIENT_SECRET`
- `X_API_ACCESS_TOKEN`
- `X_API_REFRESH_TOKEN`
- `X_API_BEARER_TOKEN`

### 4. Configure Application Settings

**Go to**: [Settings → General](https://app-vs8b106vhrxc.frontegg.com/development/settings/general)

**Allowed Origins**: Add these URLs:
- `http://localhost:3000`
- `https://symbi.world` (for production)

**Redirect URLs**: Add:
- `http://localhost:3000/api/auth/callback/frontegg`
- `http://localhost:3000/oauth/callback`

## 🔄 After Frontegg Configuration

### Step 1: Update M2M Credentials

Once you create the M2M client, update your `.env.local`:

```bash
# Replace these with your actual M2M credentials:
SYMBI_M2M_CLIENT_ID=your-actual-m2m-client-id
SYMBI_M2M_CLIENT_SECRET=your-actual-m2m-client-secret
```

### Step 2: Test M2M Authentication

```bash
# Test M2M token generation
curl -X POST https://app-vs8b106vhrxc.frontegg.com/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "client_credentials",
    "client_id": "your-m2m-client-id",
    "client_secret": "your-m2m-client-secret"
  }'
```

**Expected Response**:
```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

### Step 3: Verify Setup

```bash
# Run the verification script
node scripts/test-setup.js
```

You should see all ✅ green checkmarks!

### Step 4: Test SYMBI Agent API

```bash
# Test with M2M token
curl -H "Authorization: Bearer YOUR_M2M_TOKEN" \
     http://localhost:3000/api/symbi/agent
```

## 🚀 Postman Testing

### Import and Configure

1. **Import Collection**: `/postman/SYMBI-X-Agent-API.postman_collection.json`
2. **Import Environment**: `/postman/SYMBI-Environment-Template.postman_environment.json`
3. **Update Environment Variables**:
   - `frontegg_base_url`: `https://app-vs8b106vhrxc.frontegg.com`
   - `frontegg_client_id`: Your M2M Client ID
   - `frontegg_client_secret`: Your M2M Client Secret

### Add Auto-Authentication Script

1. **Go to Collection → Pre-request Script**
2. **Copy content from**: `/postman/frontegg-auth-script.js`
3. **Paste and save**

Now your requests will automatically get fresh tokens!

## 🔍 Troubleshooting

### "Invalid client credentials"
- ✅ Double-check M2M Client ID and Secret
- ✅ Ensure M2M client is enabled in Frontegg
- ✅ Verify scopes are properly configured

### "CORS errors"
- ✅ Add `http://localhost:3000` to allowed origins
- ✅ Check redirect URLs are configured

### "JWKS endpoint not found"
- ✅ This is normal until M2M client is properly configured
- ✅ Will resolve once you complete the M2M setup

## 📞 Need Help?

If you encounter issues:

1. **Check Frontegg Logs**: Go to [Logs](https://app-vs8b106vhrxc.frontegg.com/development/logs) in your console
2. **Verify Configuration**: Ensure all settings match this guide
3. **Test Step by Step**: Use the curl commands to isolate issues

---

**Ready?** Complete the Frontegg console configuration above, then run `node scripts/test-setup.js` to verify everything works! 🎯
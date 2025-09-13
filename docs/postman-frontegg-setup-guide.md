# Postman & Frontegg Setup Guide for SYMBI X Agent

This guide will help you set up Postman API testing and Frontegg authentication for your SYMBI X agent system.

## 🔧 Prerequisites

- Frontegg account (free tier available)
- X (Twitter) Developer Account with API v2 access
- Postman Desktop App or Web version
- Your SYMBI website running locally (`npm run dev`)

## 📋 Part 1: Frontegg Setup

### Step 1: Create Frontegg Application

1. **Sign up/Login to Frontegg**
   - Go to [Frontegg Console](https://portal.frontegg.com)
   - Create a new account or login

2. **Create New Application**
   - Click "Add Application"
   - Name: `SYMBI X Agent`
   - Choose "Web Application"

3. **Configure Application Settings**
   - **Allowed Origins**: `http://localhost:3000`, `https://symbi.world`
   - **Redirect URIs**: `http://localhost:3000/api/auth/callback/frontegg`

### Step 2: Configure Roles & Permissions

1. **Navigate to Roles & Permissions**
   - Go to "Authorization" → "Roles"

2. **Create SYMBI Roles**
   ```
   Role: social.viewer
   Description: Read-only access to social media analytics
   Permissions: social:read
   
   Role: social.reviewer  
   Description: Can review and approve social media content
   Permissions: social:read, social:review
   
   Role: social.publisher
   Description: Can publish social media content
   Permissions: social:read, social:write
   
   Role: social.admin
   Description: Full administrative access to social media system
   Permissions: social:read, social:write, social:admin
   
   Role: symbi.agent
   Description: Autonomous agent role for SYMBI operations
   Permissions: social:read, social:write, agent:operate
   ```

### Step 3: Create M2M Client for SYMBI Agent

1. **Navigate to Machine-to-Machine**
   - Go to "Authentication" → "Machine to Machine"

2. **Create M2M Client**
   - Name: `symbi-x-agent`
   - Description: `SYMBI autonomous X agent`
   - Scopes: `social:read`, `social:write`, `agent:operate`

3. **Save Credentials**
   - Copy `Client ID` and `Client Secret`
   - You'll need these for your `.env.local`

### Step 4: Configure Secrets Management

1. **Navigate to Secrets**
   - Go to "Integrations" → "Secrets Management"

2. **Add X API Secrets**
   ```
   Secret Name: X_API_CLIENT_ID
   Value: [Your X API Client ID]
   
   Secret Name: X_API_CLIENT_SECRET  
   Value: [Your X API Client Secret]
   
   Secret Name: X_API_ACCESS_TOKEN
   Value: [Your X API Access Token]
   
   Secret Name: X_API_REFRESH_TOKEN
   Value: [Your X API Refresh Token]
   
   Secret Name: X_API_BEARER_TOKEN
   Value: [Your X API Bearer Token]
   ```

### Step 5: Update Environment Variables

Update your `.env.local` file with Frontegg credentials:

```env
# Replace demo values with your actual Frontegg credentials
FRONTEGG_APP_URL=http://localhost:3000
FRONTEGG_BASE_URL=https://[your-subdomain].frontegg.com
FRONTEGG_CLIENT_ID=[your-frontegg-client-id]
FRONTEGG_API_KEY=[your-frontegg-api-key]
FRONTEGG_ENCRYPTION_PASSWORD=[generate-32-char-random-string]

# Client-side variables
NEXT_PUBLIC_FRONTEGG_APP_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEGG_BASE_URL=https://[your-subdomain].frontegg.com
NEXT_PUBLIC_FRONTEGG_CLIENT_ID=[your-frontegg-client-id]

# M2M Client for SYMBI Agent
SYMBI_M2M_CLIENT_ID=[your-m2m-client-id]
SYMBI_M2M_CLIENT_SECRET=[your-m2m-client-secret]
```

## 🚀 Part 2: Postman Setup

### Step 1: Import SYMBI Collection

1. **Open Postman**
   - Launch Postman Desktop or go to [Postman Web](https://web.postman.co)

2. **Import Collection**
   - Click "Import" button
   - Select "Upload Files"
   - Choose `/postman/SYMBI-X-Agent-API.postman_collection.json`
   - Click "Import"

### Step 2: Configure Environment Variables

1. **Create New Environment**
   - Click "Environments" in sidebar
   - Click "Create Environment"
   - Name: `SYMBI Local Development`

2. **Add Environment Variables**
   ```
   Variable: base_url
   Initial Value: http://localhost:3000
   Current Value: http://localhost:3000
   
   Variable: frontegg_base_url
   Initial Value: https://[your-subdomain].frontegg.com
   Current Value: https://[your-subdomain].frontegg.com
   
   Variable: frontegg_client_id
   Initial Value: [your-frontegg-client-id]
   Current Value: [your-frontegg-client-id]
   
   Variable: frontegg_client_secret
   Initial Value: [your-frontegg-client-secret]
   Current Value: [your-frontegg-client-secret]
   
   Variable: frontegg_token
   Initial Value: [leave empty - will be set by auth request]
   Current Value: [leave empty]
   
   Variable: x_access_token
   Initial Value: [your-x-access-token]
   Current Value: [your-x-access-token]
   
   Variable: x_refresh_token
   Initial Value: [your-x-refresh-token] 
   Current Value: [your-x-refresh-token]
   ```

3. **Save Environment**
   - Click "Save" button
   - Select this environment in the top-right dropdown

### Step 3: Test Authentication Flow

1. **Get Frontegg M2M Token**
   - Open "Authentication" folder
   - Select "Get M2M Token" request
   - Click "Send"
   - Copy the `access_token` from response
   - Set it as `frontegg_token` environment variable

2. **Test X OAuth Flow**
   - Select "Get X OAuth URL" request
   - Click "Send"
   - Follow the authorization URL in response
   - Complete X OAuth flow

3. **Validate Setup**
   - Select "Validate Frontegg Token" request
   - Click "Send"
   - Should return user information

## 🧪 Part 3: Testing Your Setup

### Test Agent Status
```bash
# In Postman, run:
GET {{base_url}}/api/symbi/agent
Authorization: Bearer {{frontegg_token}}
```

### Test X API Connection
```bash
# In Postman, run:
POST {{base_url}}/api/symbi/agent
Authorization: Bearer {{frontegg_token}}
Body: {
  "action": "test_connection"
}
```

### Test Content Generation
```bash
# In Postman, run:
POST {{base_url}}/api/symbi/agent  
Authorization: Bearer {{frontegg_token}}
Body: {
  "action": "generate_content",
  "category": "manifesto",
  "context": "AI ethics discussion"
}
```

## 🔒 Security Best Practices

1. **Never commit secrets to git**
   - Use `.env.local` for local development
   - Use Frontegg Secrets for production

2. **Rotate tokens regularly**
   - X API tokens: Every 90 days
   - Frontegg M2M tokens: Every 30 days

3. **Use least privilege principle**
   - Assign minimal required roles
   - Review permissions quarterly

4. **Enable MFA**
   - Required for `social.admin` role
   - Recommended for all users

## 🚨 Troubleshooting

### Common Issues

**"Invalid Frontegg token"**
- Check token expiry (24 hours default)
- Verify client ID/secret in environment
- Ensure M2M client has correct scopes

**"X API authentication failed"**
- Verify X API credentials in Frontegg secrets
- Check X app permissions (read + write)
- Ensure user context tokens (not just app tokens)

**"CORS errors in browser"**
- Add your domain to Frontegg allowed origins
- Check NEXT_PUBLIC_ environment variables

**"Rate limit exceeded"**
- X API has strict rate limits
- Implement exponential backoff
- Consider upgrading X API plan

### Debug Commands

```bash
# Check environment variables
echo $FRONTEGG_CLIENT_ID
echo $X_API_CLIENT_ID

# Test local server
curl http://localhost:3000/api/symbi/agent

# Validate Frontegg token
curl -H "Authorization: Bearer $TOKEN" \
     https://your-subdomain.frontegg.com/identity/resources/users/v1/me
```

## 📚 Next Steps

1. **Configure Overseer Policies**
   - Review `/config/overseer-policy.json`
   - Adjust thresholds for your use case

2. **Set Up Monitoring**
   - Configure Frontegg webhooks
   - Set up X API usage alerts

3. **Deploy to Production**
   - Update environment variables for production
   - Configure production Frontegg tenant
   - Set up CI/CD pipeline

4. **Test Full Workflow**
   - Generate content → Review → Approve → Post
   - Monitor engagement metrics
   - Iterate on content strategy

---

**Need Help?** 
- Check the [Frontegg Documentation](https://docs.frontegg.com)
- Review [X API Documentation](https://developer.twitter.com/en/docs/twitter-api)
- Test endpoints using the Postman collection
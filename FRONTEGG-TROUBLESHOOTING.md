# Frontegg Setup Troubleshooting Guide

## Current Issue Analysis

### Problem Identified
The Frontegg JWKS endpoints are returning 404 errors, indicating that your Frontegg domain `app-vs8b106vhrxc.frontegg.com` is not properly configured or accessible.

### Failed Endpoints Tested
- ❌ `https://app-vs8b106vhrxc.frontegg.com/.well-known/jwks`
- ❌ `https://app-vs8b106vhrxc.frontegg.com/oauth/jwks`
- ❌ `https://app-vs8b106vhrxc.frontegg.com/.well-known/openid_configuration`

## Step-by-Step Troubleshooting

### Step 1: Verify Your Frontegg Domain

1. **Log into your Frontegg Portal**: https://frontegg.com
2. **Navigate to**: Environment → Keys & Domains
3. **Check your domain**: Look for the "Frontegg Domain" field
4. **Verify format**: Should look like `app-xxxxxxxx.frontegg.com`

### Step 2: Test Your Actual Domain

Once you have the correct domain from Step 1, test these endpoints:

```bash
# Replace YOUR_ACTUAL_DOMAIN with your real Frontegg domain
curl -s https://YOUR_ACTUAL_DOMAIN/.well-known/openid_configuration
curl -s https://YOUR_ACTUAL_DOMAIN/oauth/jwks
```

### Step 3: Check Environment Status

1. **In Frontegg Portal**: Go to your Environment dashboard
2. **Verify**: Environment is active and not in "Draft" mode
3. **Check**: Authentication → Login Method → Hosted Login is enabled
4. **Confirm**: Your application is properly configured

### Step 4: Verify Application Configuration

1. **Go to**: Applications tab in Frontegg Portal
2. **Check**: Your application exists and is active
3. **Verify**: Client ID matches what's in your `.env.local`
4. **Confirm**: API Key is correct

### Step 5: Test Hosted Login Page

Try accessing your hosted login page:
```
https://YOUR_ACTUAL_DOMAIN/oauth/account/login
```

This should show a login page, not a 404 error.

## Common Issues and Solutions

### Issue 1: Wrong Domain Format
**Problem**: Using incorrect domain format
**Solution**: Ensure domain follows `app-xxxxxxxx.frontegg.com` pattern

### Issue 2: Environment Not Published
**Problem**: Changes not published to live environment
**Solution**: 
1. Go to Builder → Login Box
2. Click "Review" then "Publish"

### Issue 3: Application Not Configured
**Problem**: No default application or misconfigured app
**Solution**:
1. Go to Applications tab
2. Ensure you have at least one active application
3. Set one as default if multiple exist

### Issue 4: Incorrect Credentials
**Problem**: Wrong Client ID or API Key
**Solution**:
1. Go to Keys & Domains
2. Copy the exact Client ID and API Key
3. Update your `.env.local` file

## Quick Fix Script

Run this script to help identify the issue:

```bash
# Test current configuration
echo "Testing current Frontegg configuration..."
echo "Domain: https://app-vs8b106vhrxc.frontegg.com"
echo "Testing hosted login page..."
curl -I https://app-vs8b106vhrxc.frontegg.com/oauth/account/login
echo "\nTesting JWKS endpoint..."
curl -s https://app-vs8b106vhrxc.frontegg.com/oauth/jwks | head -5
```

## Next Steps After Fixing Domain

1. **Update `.env.local`** with correct domain:
   ```env
   FRONTEGG_BASE_URL=https://YOUR_CORRECT_DOMAIN
   NEXT_PUBLIC_FRONTEGG_BASE_URL=https://YOUR_CORRECT_DOMAIN
   ```

2. **Test the setup**:
   ```bash
   node scripts/test-setup.js
   ```

3. **Configure M2M Client** (if not done):
   - Go to Administration → API Tokens
   - Create new M2M client
   - Add required scopes
   - Update `.env.local` with M2M credentials

## Need Help?

1. **Check Frontegg Documentation**: https://developers.frontegg.com
2. **Contact Frontegg Support**: Through your portal
3. **Review Setup Logs**: Check browser console for errors

## Verification Checklist

- [ ] Correct Frontegg domain identified
- [ ] Domain endpoints return valid responses
- [ ] Environment is active and published
- [ ] Application is configured and active
- [ ] Credentials match between portal and `.env.local`
- [ ] Hosted login page loads successfully
- [ ] JWKS endpoint returns valid JSON
- [ ] M2M client configured (if needed)

Once you complete these steps, your Frontegg integration should work properly!
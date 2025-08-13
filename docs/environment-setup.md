# Environment Variables Setup Guide

## Required Environment Variables

### Supabase Configuration
Add these to your Vercel deployment or local `.env.local` file:

\`\`\`bash
# Your Supabase project URL (found in Settings > API)
SUPABASE_URL=https://your-project-id.supabase.co

# Public anon key (found in Settings > API)
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service role key (found in Settings > API) - REQUIRED for admin access
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### Optional: Upstash KV (Fallback Storage)
\`\`\`bash
KV_REST_API_URL=https://your-kv-url.upstash.io
KV_REST_API_TOKEN=your-kv-token
\`\`\`

## How to Find Your Supabase Keys

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Sign in and select your project

2. **Navigate to Settings > API**
   - In the left sidebar, click "Settings"
   - Click "API" in the settings menu

3. **Copy the Required Keys**
   - **Project URL**: Copy the URL (starts with https://)
   - **anon/public key**: Copy the "anon public" key
   - **service_role key**: Copy the "service_role" key (⚠️ Keep this secret!)

## Setting Environment Variables in Vercel

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Select your project

2. **Navigate to Settings > Environment Variables**
   - Click "Settings" tab
   - Click "Environment Variables" in the sidebar

3. **Add Each Variable**
   - Click "Add New"
   - Enter the name (e.g., `SUPABASE_URL`)
   - Enter the value
   - Select "Production", "Preview", and "Development"
   - Click "Save"

4. **Redeploy Your Application**
   - Go to the "Deployments" tab
   - Click the three dots on your latest deployment
   - Click "Redeploy"

## Security Notes

- ⚠️ **Never commit the service role key to your repository**
- ✅ The anon key is safe to expose in client-side code
- ✅ The service role key should only be used in server-side code
- ✅ Environment variables in Vercel are automatically encrypted

## Testing Your Setup

After setting the environment variables:

1. Visit `/admin/signups` on your deployed site
2. If you see connection errors, check your environment variables
3. Use the test form to verify email capture is working
4. Check your Supabase dashboard to see stored emails
\`\`\`

Now let me provide the complete admin API file with all the actual content:

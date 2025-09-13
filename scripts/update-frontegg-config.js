#!/usr/bin/env node

/**
 * SYMBI Frontegg Configuration Updater
 * 
 * This script helps you update your .env.local file with actual Frontegg credentials.
 * Run this after gathering your credentials from the Frontegg console.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ENV_FILE = path.join(__dirname, '..', '.env.local');

console.log('🔗 SYMBI Frontegg Configuration Updater');
console.log('=====================================\n');

console.log('📋 Please gather the following from your Frontegg console:');
console.log('1. Settings → General → Base URL (e.g., https://your-subdomain.frontegg.com)');
console.log('2. Settings → General → Client ID');
console.log('3. Settings → General → API Key');
console.log('4. Authentication → Machine to Machine → Client ID & Secret\n');

const questions = [
  {
    key: 'FRONTEGG_BASE_URL',
    prompt: '🌐 Enter your Frontegg Base URL (e.g., https://symbi-demo.frontegg.com): ',
    validate: (value) => value.startsWith('https://') && value.includes('.frontegg.com')
  },
  {
    key: 'FRONTEGG_CLIENT_ID',
    prompt: '🔑 Enter your Frontegg Client ID: ',
    validate: (value) => value.length > 10
  },
  {
    key: 'FRONTEGG_API_KEY',
    prompt: '🗝️  Enter your Frontegg API Key: ',
    validate: (value) => value.length > 10
  },
  {
    key: 'SYMBI_M2M_CLIENT_ID',
    prompt: '🤖 Enter your M2M Client ID: ',
    validate: (value) => value.length > 5
  },
  {
    key: 'SYMBI_M2M_CLIENT_SECRET',
    prompt: '🔐 Enter your M2M Client Secret: ',
    validate: (value) => value.length > 10
  }
];

async function askQuestion(question) {
  return new Promise((resolve) => {
    const ask = () => {
      rl.question(question.prompt, (answer) => {
        if (question.validate && !question.validate(answer.trim())) {
          console.log('❌ Invalid format. Please try again.');
          ask();
        } else {
          resolve(answer.trim());
        }
      });
    };
    ask();
  });
}

async function updateEnvFile(updates) {
  try {
    let envContent = fs.readFileSync(ENV_FILE, 'utf8');
    
    // Update each variable
    Object.entries(updates).forEach(([key, value]) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
      } else {
        envContent += `\n${key}=${value}`;
      }
      
      // Also update NEXT_PUBLIC_ versions
      if (key === 'FRONTEGG_BASE_URL') {
        const publicRegex = new RegExp(`^NEXT_PUBLIC_FRONTEGG_BASE_URL=.*$`, 'm');
        if (publicRegex.test(envContent)) {
          envContent = envContent.replace(publicRegex, `NEXT_PUBLIC_FRONTEGG_BASE_URL=${value}`);
        }
      }
      
      if (key === 'FRONTEGG_CLIENT_ID') {
        const publicRegex = new RegExp(`^NEXT_PUBLIC_FRONTEGG_CLIENT_ID=.*$`, 'm');
        if (publicRegex.test(envContent)) {
          envContent = envContent.replace(publicRegex, `NEXT_PUBLIC_FRONTEGG_CLIENT_ID=${value}`);
        }
      }
    });
    
    // Create backup
    fs.writeFileSync(`${ENV_FILE}.backup`, fs.readFileSync(ENV_FILE));
    
    // Write updated content
    fs.writeFileSync(ENV_FILE, envContent);
    
    console.log('\n✅ Environment file updated successfully!');
    console.log('📁 Backup created at .env.local.backup');
    
  } catch (error) {
    console.error('❌ Error updating environment file:', error.message);
    process.exit(1);
  }
}

async function testConnection(baseUrl, clientId, clientSecret) {
  console.log('\n🧪 Testing Frontegg connection...');
  
  try {
    // Test JWKS endpoint
    const jwksUrl = `${baseUrl}/.well-known/jwks_json`;
    console.log(`📡 Testing JWKS endpoint: ${jwksUrl}`);
    
    // Test M2M token generation
    console.log('🔐 Testing M2M token generation...');
    
    const tokenResponse = await fetch(`${baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      })
    });
    
    if (tokenResponse.ok) {
      const tokenData = await tokenResponse.json();
      console.log('✅ M2M token generated successfully!');
      console.log(`🕐 Token expires in: ${tokenData.expires_in} seconds`);
      return true;
    } else {
      const error = await tokenResponse.text();
      console.log('❌ M2M token generation failed:', error);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Connection test failed:', error.message);
    return false;
  }
}

async function main() {
  try {
    const updates = {};
    
    // Collect all answers
    for (const question of questions) {
      const answer = await askQuestion(question);
      updates[question.key] = answer;
    }
    
    console.log('\n📝 Configuration Summary:');
    console.log('========================');
    Object.entries(updates).forEach(([key, value]) => {
      const displayValue = key.includes('SECRET') || key.includes('KEY') 
        ? value.substring(0, 8) + '...' 
        : value;
      console.log(`${key}: ${displayValue}`);
    });
    
    const confirm = await askQuestion({
      prompt: '\n✅ Update .env.local with these values? (y/N): ',
      validate: () => true
    });
    
    if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
      await updateEnvFile(updates);
      
      // Test connection
      const testSuccess = await testConnection(
        updates.FRONTEGG_BASE_URL,
        updates.SYMBI_M2M_CLIENT_ID,
        updates.SYMBI_M2M_CLIENT_SECRET
      );
      
      if (testSuccess) {
        console.log('\n🎉 Setup complete! Your SYMBI agent is ready.');
        console.log('\n🚀 Next steps:');
        console.log('1. Restart your dev server: npm run dev');
        console.log('2. Test the agent API: http://localhost:3000/symbi/agent');
        console.log('3. Import Postman collection and test endpoints');
        console.log('\n📖 See FRONTEGG-INTEGRATION-GUIDE.md for detailed instructions.');
      } else {
        console.log('\n⚠️  Configuration saved but connection test failed.');
        console.log('Please verify your credentials in the Frontegg console.');
      }
    } else {
      console.log('\n❌ Configuration cancelled.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Configuration cancelled.');
  rl.close();
  process.exit(0);
});

if (require.main === module) {
  main();
}

module.exports = { updateEnvFile, testConnection };
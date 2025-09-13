#!/usr/bin/env node

/**
 * SYMBI Setup Verification Script
 * 
 * This script tests the Frontegg and X API integration setup
 * Run with: node scripts/test-setup.js
 */

require('dotenv').config({ path: '.env.local' });
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 10000
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testEnvironmentVariables() {
  log('\n🔍 Testing Environment Variables...', 'blue');
  
  const requiredVars = [
    'FRONTEGG_BASE_URL',
    'FRONTEGG_CLIENT_ID',
    'X_API_CLIENT_ID',
    'SYMBI_AGENT_ENABLED'
  ];
  
  let allPresent = true;
  
  for (const varName of requiredVars) {
    if (process.env[varName]) {
      log(`  ✅ ${varName}: Set`, 'green');
    } else {
      log(`  ❌ ${varName}: Missing`, 'red');
      allPresent = false;
    }
  }
  
  return allPresent;
}

async function testLocalServer() {
  log('\n🌐 Testing Local Server...', 'blue');
  
  try {
    const response = await makeRequest('http://localhost:3000/api/symbi/agent');
    
    if (response.status === 401) {
      log('  ✅ Server running (authentication required)', 'green');
      return true;
    } else if (response.status === 200) {
      log('  ⚠️  Server running (no authentication - check Frontegg integration)', 'yellow');
      return true;
    } else {
      log(`  ❌ Unexpected response: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`  ❌ Server not accessible: ${error.message}`, 'red');
    log('  💡 Make sure to run: npm run dev', 'yellow');
    return false;
  }
}

async function testFronteggConnection() {
  log('\n🔐 Testing Frontegg Connection...', 'blue');
  
  const fronteggBaseUrl = process.env.FRONTEGG_BASE_URL;
  if (!fronteggBaseUrl) {
    log('  ❌ FRONTEGG_BASE_URL not set', 'red');
    return false;
  }
  
  try {
    const jwksUrl = `${fronteggBaseUrl}/oauth/jwks`;
    const response = await makeRequest(jwksUrl);
    
    if (response.status === 200) {
      if (response.data && response.data.keys && response.data.keys.length > 0) {
        log('  ✅ JWKS endpoint accessible', 'green');
        log(`  🔑 Found ${response.data.keys.length} signing key(s)`, 'blue');
        return true;
      } else if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
        log('  ❌ JWKS endpoint returns HTML (login page)', 'red');
        log('  💡 This suggests your Frontegg environment needs configuration', 'yellow');
        log('  📝 Check: Environment published, Application configured, Hosted login enabled', 'yellow');
        return false;
      } else {
        log('  ❌ Invalid JWKS response: No keys found', 'red');
        return false;
      }
    } else {
      log(`  ❌ JWKS endpoint failed: ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`  ❌ JWKS connection failed: ${error.message}`, 'red');
    log('  💡 Check your FRONTEGG_BASE_URL', 'yellow');
    return false;
  }
}

async function testPostmanCollection() {
  log('\n📋 Testing Postman Collection...', 'blue');
  
  const fs = require('fs');
  const path = require('path');
  
  const collectionPath = path.join(__dirname, '../postman/SYMBI-X-Agent-API.postman_collection.json');
  const environmentPath = path.join(__dirname, '../postman/SYMBI-Environment-Template.postman_environment.json');
  
  try {
    if (fs.existsSync(collectionPath)) {
      const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
      log(`  ✅ Postman collection found: ${collection.info.name}`, 'green');
      log(`  📊 ${collection.item.length} request folders`, 'blue');
    } else {
      log('  ❌ Postman collection not found', 'red');
      return false;
    }
    
    if (fs.existsSync(environmentPath)) {
      const environment = JSON.parse(fs.readFileSync(environmentPath, 'utf8'));
      log(`  ✅ Environment template found: ${environment.name}`, 'green');
      log(`  📊 ${environment.values.length} variables defined`, 'blue');
    } else {
      log('  ❌ Environment template not found', 'red');
      return false;
    }
    
    return true;
  } catch (error) {
    log(`  ❌ Error reading Postman files: ${error.message}`, 'red');
    return false;
  }
}

async function generateSetupReport() {
  log('\n📊 Setup Report', 'bold');
  log('================', 'bold');
  
  const envTest = await testEnvironmentVariables();
  const serverTest = await testLocalServer();
  const fronteggTest = await testFronteggConnection();
  const postmanTest = await testPostmanCollection();
  
  const allPassed = envTest && serverTest && fronteggTest && postmanTest;
  
  log('\n🎯 Summary:', 'bold');
  log(`Environment Variables: ${envTest ? '✅' : '❌'}`);
  log(`Local Server: ${serverTest ? '✅' : '❌'}`);
  log(`Frontegg Connection: ${fronteggTest ? '✅' : '❌'}`);
  log(`Postman Collection: ${postmanTest ? '✅' : '❌'}`);
  
  if (allPassed) {
    log('\n🎉 All tests passed! Your setup is ready.', 'green');
    log('\n📝 Next steps:', 'blue');
    log('1. Import Postman collection and environment template');
    log('2. Update environment variables with your actual credentials');
    log('3. Set up Frontegg roles and M2M client');
    log('4. Test API endpoints using Postman');
  } else {
    log('\n⚠️  Some tests failed. Please check the setup guide.', 'yellow');
    log('📖 See: /docs/postman-frontegg-setup-guide.md', 'blue');
  }
  
  return allPassed;
}

// Main execution
if (require.main === module) {
  log('🚀 SYMBI Setup Verification', 'bold');
  log('============================', 'bold');
  
  generateSetupReport()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      log(`\n💥 Unexpected error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  testEnvironmentVariables,
  testLocalServer,
  testFronteggConnection,
  testPostmanCollection,
  generateSetupReport
};
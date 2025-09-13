#!/usr/bin/env node

const https = require('https');
const http = require('http');
const url = require('url');

require('dotenv').config({ path: '.env.local' });

console.log('🔍 Frontegg Domain Diagnosis Tool');
console.log('================================\n');

const currentDomain = process.env.FRONTEGG_BASE_URL;
const clientId = process.env.FRONTEGG_CLIENT_ID;
const apiKey = process.env.FRONTEGG_API_KEY;

console.log('📋 Current Configuration:');
console.log(`Domain: ${currentDomain || 'NOT SET'}`);
console.log(`Client ID: ${clientId ? clientId.substring(0, 8) + '...' : 'NOT SET'}`);
console.log(`API Key: ${apiKey ? apiKey.substring(0, 8) + '...' : 'NOT SET'}`);
console.log();

if (!currentDomain) {
    console.log('❌ FRONTEGG_BASE_URL is not set in .env.local');
    console.log('\n📝 To fix this:');
    console.log('1. Log into your Frontegg Portal: https://frontegg.com');
    console.log('2. Go to Environment → Keys & Domains');
    console.log('3. Copy your "Frontegg Domain" (should look like app-xxxxxxxx.frontegg.com)');
    console.log('4. Update FRONTEGG_BASE_URL in .env.local');
    process.exit(1);
}

function testEndpoint(testUrl, description) {
    return new Promise((resolve) => {
        const parsedUrl = url.parse(testUrl);
        const client = parsedUrl.protocol === 'https:' ? https : http;
        
        const req = client.get(testUrl, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    url: testUrl,
                    status: res.statusCode,
                    description,
                    data: data.substring(0, 200),
                    success: res.statusCode === 200
                });
            });
        });
        
        req.on('error', (err) => {
            resolve({
                url: testUrl,
                status: 'ERROR',
                description,
                data: err.message,
                success: false
            });
        });
        
        req.setTimeout(5000, () => {
            req.destroy();
            resolve({
                url: testUrl,
                status: 'TIMEOUT',
                description,
                data: 'Request timed out',
                success: false
            });
        });
    });
}

async function runDiagnosis() {
    console.log('🧪 Testing Frontegg Endpoints...');
    console.log('================================\n');
    
    const tests = [
        {
            url: `${currentDomain}/oauth/account/login`,
            description: 'Hosted Login Page'
        },
        {
            url: `${currentDomain}/.well-known/openid_configuration`,
            description: 'OpenID Connect Discovery'
        },
        {
            url: `${currentDomain}/oauth/jwks`,
            description: 'JWKS Endpoint (OAuth)'
        },
        {
            url: `${currentDomain}/.well-known/jwks`,
            description: 'JWKS Endpoint (Well-known)'
        }
    ];
    
    const results = [];
    
    for (const test of tests) {
        process.stdout.write(`Testing ${test.description}... `);
        const result = await testEndpoint(test.url, test.description);
        results.push(result);
        
        if (result.success) {
            console.log('✅ SUCCESS');
        } else {
            console.log(`❌ FAILED (${result.status})`);
        }
    }
    
    console.log('\n📊 Detailed Results:');
    console.log('====================\n');
    
    results.forEach(result => {
        console.log(`🔗 ${result.description}`);
        console.log(`   URL: ${result.url}`);
        console.log(`   Status: ${result.status}`);
        
        if (result.success) {
            console.log('   ✅ Working correctly');
            if (result.description.includes('JWKS')) {
                try {
                    const jwks = JSON.parse(result.data);
                    if (jwks.keys && jwks.keys.length > 0) {
                        console.log(`   🔑 Found ${jwks.keys.length} signing key(s)`);
                    }
                } catch (e) {
                    console.log('   ⚠️  Response is not valid JSON');
                }
            }
        } else {
            console.log(`   ❌ Error: ${result.data.substring(0, 100)}`);
        }
        console.log();
    });
    
    // Summary and recommendations
    const workingEndpoints = results.filter(r => r.success).length;
    const totalEndpoints = results.length;
    
    console.log('🎯 Summary & Recommendations:');
    console.log('=============================\n');
    
    if (workingEndpoints === 0) {
        console.log('❌ CRITICAL: No endpoints are working');
        console.log('\n🔧 Possible Issues:');
        console.log('   1. Wrong Frontegg domain in .env.local');
        console.log('   2. Frontegg environment not published/active');
        console.log('   3. Network connectivity issues');
        console.log('   4. Frontegg application not configured');
        console.log('\n📝 Next Steps:');
        console.log('   1. Verify your domain in Frontegg Portal');
        console.log('   2. Check environment status');
        console.log('   3. Ensure hosted login is enabled');
    } else if (workingEndpoints < totalEndpoints) {
        console.log(`⚠️  PARTIAL: ${workingEndpoints}/${totalEndpoints} endpoints working`);
        console.log('\n🔧 Some endpoints are failing - this might be normal');
        console.log('   The hosted login page should work for basic authentication');
    } else {
        console.log('✅ EXCELLENT: All endpoints are working!');
        console.log('\n🎉 Your Frontegg domain is properly configured');
        console.log('   You can now proceed with M2M client setup');
    }
    
    console.log('\n📖 For detailed troubleshooting, see:');
    console.log('   ./FRONTEGG-TROUBLESHOOTING.md');
}

runDiagnosis().catch(console.error);
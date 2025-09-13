// Frontegg M2M Authentication Pre-request Script
// Add this to your Postman collection's Pre-request Script tab

// Check if we have a valid token
const currentToken = pm.environment.get('frontegg_token');
const tokenExpiry = pm.environment.get('frontegg_token_expiry');
const now = new Date().getTime();

// If no token or token is expired, get a new one
if (!currentToken || !tokenExpiry || now >= parseInt(tokenExpiry)) {
    console.log('Getting new Frontegg M2M token...');
    
    const fronteggBaseUrl = pm.environment.get('frontegg_base_url');
    const clientId = pm.environment.get('frontegg_client_id');
    const clientSecret = pm.environment.get('frontegg_client_secret');
    
    if (!fronteggBaseUrl || !clientId || !clientSecret) {
        console.error('Missing Frontegg credentials in environment variables');
        return;
    }
    
    const tokenRequest = {
        url: `${fronteggBaseUrl}/oauth/token`,
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret
            })
        }
    };
    
    pm.sendRequest(tokenRequest, (err, response) => {
        if (err) {
            console.error('Error getting Frontegg token:', err);
            return;
        }
        
        if (response.code !== 200) {
            console.error('Failed to get Frontegg token:', response.json());
            return;
        }
        
        const responseJson = response.json();
        const accessToken = responseJson.access_token;
        const expiresIn = responseJson.expires_in || 3600; // Default 1 hour
        
        // Calculate expiry time (subtract 5 minutes for buffer)
        const expiryTime = now + ((expiresIn - 300) * 1000);
        
        // Store token and expiry in environment
        pm.environment.set('frontegg_token', accessToken);
        pm.environment.set('frontegg_token_expiry', expiryTime.toString());
        
        console.log('Frontegg token updated successfully');
        console.log('Token expires at:', new Date(expiryTime).toISOString());
    });
} else {
    console.log('Using existing Frontegg token');
    console.log('Token expires at:', new Date(parseInt(tokenExpiry)).toISOString());
}

// Helper function to decode JWT (for debugging)
function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Error decoding JWT:', e);
        return null;
    }
}

// Log token info for debugging (optional)
if (pm.environment.get('frontegg_token')) {
    const tokenInfo = decodeJWT(pm.environment.get('frontegg_token'));
    if (tokenInfo) {
        console.log('Token subject:', tokenInfo.sub);
        console.log('Token roles:', tokenInfo.roles);
        console.log('Token permissions:', tokenInfo.permissions);
    }
}
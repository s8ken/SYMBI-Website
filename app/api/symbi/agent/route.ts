import { NextRequest, NextResponse } from 'next/server';
import { symbiAgent } from '@/lib/symbi-agent';
import { xApiClient } from '@/lib/x-api-client';
import { authenticateRequest, SYMBI_ROLES, roleCheckers } from '@/lib/frontegg-auth';

// GET /api/symbi/agent - Get agent status
export async function GET(request: NextRequest) {
  try {
    // Authenticate request - requires viewer role or higher
    const auth = await authenticateRequest(request, [SYMBI_ROLES.VIEWER]);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    const status = symbiAgent.getStatus();
    
    return NextResponse.json({
      success: true,
      status,
      user: auth.user?.sub // Include user info for debugging
    });
  } catch (error) {
    console.error('Error getting agent status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get agent status' },
      { status: 500 }
    );
  }
}

// POST /api/symbi/agent - Control agent actions
export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();
    
    // Determine required role based on action
    let requiredRoles: string[] = [];
    switch (action) {
      case 'post_tweet':
      case 'reply_to_tweet':
        requiredRoles = [SYMBI_ROLES.PUBLISHER, SYMBI_ROLES.ADMIN, SYMBI_ROLES.AGENT];
        break;
      case 'monitor_and_respond':
      case 'update_config':
        requiredRoles = [SYMBI_ROLES.ADMIN, SYMBI_ROLES.AGENT];
        break;
      case 'test_connection':
        requiredRoles = [SYMBI_ROLES.VIEWER];
        break;
      default:
        requiredRoles = [SYMBI_ROLES.ADMIN];
    }

    // Authenticate request
    const auth = await authenticateRequest(request, requiredRoles);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }
    
    switch (action) {
      case 'post_tweet':
        if (!roleCheckers.canPublish(auth.user)) {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions to publish' },
            { status: 403 }
          );
        }
        
        if (!symbiAgent.isEnabled()) {
          return NextResponse.json(
            { success: false, error: 'SYMBI Agent is not enabled' },
            { status: 400 }
          );
        }
        
        const tweetResult = await symbiAgent.postSymbiTweet();
        return NextResponse.json({
          success: true,
          tweet: tweetResult.data,
          message: 'SYMBI tweet posted successfully'
        });
      
      case 'reply_to_tweet':
        if (!roleCheckers.canPublish(auth.user)) {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions to publish' },
            { status: 403 }
          );
        }
        
        const { tweetId, originalContent } = params;
        
        if (!tweetId || !originalContent) {
          return NextResponse.json(
            { success: false, error: 'Tweet ID and original content are required' },
            { status: 400 }
          );
        }
        
        const replyResult = await symbiAgent.replyToTweet(tweetId, originalContent);
        return NextResponse.json({
          success: true,
          reply: replyResult.data,
          message: 'SYMBI reply posted successfully'
        });
      
      case 'monitor_and_respond':
        if (!roleCheckers.canAdmin(auth.user) && !roleCheckers.isAgent(auth.user)) {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions for monitoring control' },
            { status: 403 }
          );
        }
        
        const { searchQuery } = params;
        
        // Run monitoring in background (don't await)
        symbiAgent.monitorAndRespond(searchQuery).catch(error => {
          console.error('Error in background monitoring:', error);
        });
        
        return NextResponse.json({
          success: true,
          message: 'Monitoring started in background'
        });
      
      case 'update_config':
        if (!roleCheckers.canAdmin(auth.user) && !roleCheckers.isAgent(auth.user)) {
          return NextResponse.json(
            { success: false, error: 'Insufficient permissions for configuration updates' },
            { status: 403 }
          );
        }
        
        const { config } = params;
        
        if (!config) {
          return NextResponse.json(
            { success: false, error: 'Configuration is required' },
            { status: 400 }
          );
        }
        
        symbiAgent.updateConfig(config);
        return NextResponse.json({
          success: true,
          message: 'Agent configuration updated',
          newStatus: symbiAgent.getStatus()
        });
      
      case 'test_connection':
        // Test X API connection
        const accessToken = request.cookies.get('x_access_token')?.value || process.env.X_API_ACCESS_TOKEN;
        
        if (!accessToken) {
          return NextResponse.json(
            { success: false, error: 'No access token available' },
            { status: 400 }
          );
        }
        
        const user = await xApiClient.getCurrentUser(accessToken);
        return NextResponse.json({
          success: true,
          user: user.data,
          message: 'X API connection successful'
        });
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in agent action:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT /api/symbi/agent - Update agent configuration
export async function PUT(request: NextRequest) {
  try {
    // Authenticate request - requires admin or agent role
    const auth = await authenticateRequest(request, [SYMBI_ROLES.ADMIN, SYMBI_ROLES.AGENT]);
    if (!auth.success) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: 401 }
      );
    }

    if (!roleCheckers.canAdmin(auth.user) && !roleCheckers.isAgent(auth.user)) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions for configuration updates' },
        { status: 403 }
      );
    }
    
    const config = await request.json();
    
    symbiAgent.updateConfig(config);
    
    return NextResponse.json({
      success: true,
      message: 'Agent configuration updated successfully',
      status: symbiAgent.getStatus()
    });
  } catch (error) {
    console.error('Error updating agent config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update agent configuration' },
      { status: 500 }
    );
  }
}
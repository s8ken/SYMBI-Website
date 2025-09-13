'use client';

import { useState, useEffect } from 'react';

interface AgentStatus {
  enabled: boolean;
  replyEnabled: boolean;
  postInterval: number;
  lastPostTime: number;
  nextPostTime: number;
  shouldPost: boolean;
}

interface UserInfo {
  id: string;
  username: string;
  name: string;
}

export default function SymbiAgentPage() {
  const [agentStatus, setAgentStatus] = useState<AgentStatus | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [replyTweetId, setReplyTweetId] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('trust protocol OR blockchain trust OR decentralized trust');

  // Load agent status on component mount
  useEffect(() => {
    loadAgentStatus();
    checkUrlParams();
  }, []);

  // Check URL parameters for OAuth results
  const checkUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const success = urlParams.get('success');
    const username = urlParams.get('username');

    if (error) {
      setError(`Authentication failed: ${error}`);
    } else if (success && username) {
      setSuccess(`Successfully authenticated as @${username}`);
      setUserInfo({ id: '', username, name: username });
    }

    // Clean up URL
    if (error || success) {
      window.history.replaceState({}, '', '/symbi/agent');
    }
  };

  const loadAgentStatus = async () => {
    try {
      const response = await fetch('/api/symbi/agent');
      const data = await response.json();
      
      if (data.success) {
        setAgentStatus(data.status);
      }
    } catch (error) {
      console.error('Error loading agent status:', error);
    }
  };

  const authenticateWithX = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/x/auth');
      const data = await response.json();
      
      if (data.success) {
        window.location.href = data.authUrl;
      } else {
        setError(data.error || 'Failed to initiate authentication');
      }
    } catch (error) {
      setError('Network error during authentication');
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/symbi/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_connection' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserInfo(data.user);
        setSuccess('X API connection successful!');
      } else {
        setError(data.error || 'Connection test failed');
      }
    } catch (error) {
      setError('Network error during connection test');
    } finally {
      setLoading(false);
    }
  };

  const postTweet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/symbi/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'post_tweet' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(`Tweet posted successfully! ID: ${data.tweet.id}`);
        loadAgentStatus();
      } else {
        setError(data.error || 'Failed to post tweet');
      }
    } catch (error) {
      setError('Network error while posting tweet');
    } finally {
      setLoading(false);
    }
  };

  const postReply = async () => {
    if (!replyTweetId || !replyContent) {
      setError('Please provide both tweet ID and reply content');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/symbi/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'reply_to_tweet',
          tweetId: replyTweetId,
          originalContent: replyContent
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess(`Reply posted successfully! ID: ${data.reply.id}`);
        setReplyTweetId('');
        setReplyContent('');
      } else {
        setError(data.error || 'Failed to post reply');
      }
    } catch (error) {
      setError('Network error while posting reply');
    } finally {
      setLoading(false);
    }
  };

  const startMonitoring = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/symbi/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'monitor_and_respond',
          searchQuery
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuccess('Monitoring started! The agent will respond to relevant tweets.');
      } else {
        setError(data.error || 'Failed to start monitoring');
      }
    } catch (error) {
      setError('Network error while starting monitoring');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          🤖 SYMBI Agent Control Panel
        </h1>
        <p className="text-gray-600">
          Manage your SYMBI agent for automated X (Twitter) posting and engagement
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 border border-red-200 bg-red-50 rounded-lg">
          <p className="text-red-800">❌ {error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 border border-green-200 bg-green-50 rounded-lg">
          <p className="text-green-800">✅ {success}</p>
        </div>
      )}

      <div className="grid gap-6">
        {/* Authentication Status */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-2">🐦 X (Twitter) Authentication</h2>
          <p className="text-gray-600 mb-4">
            Connect your X developer account to enable the SYMBI agent
          </p>
          
          <div className="space-y-4">
            {userInfo ? (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">Connected</span>
                <span>@{userInfo.username}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">Not Connected</span>
              </div>
            )}
            
            <div className="flex gap-2">
              <button 
                onClick={authenticateWithX} 
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {userInfo ? 'Re-authenticate' : 'Authenticate with X'}
              </button>
              <button 
                onClick={testConnection} 
                disabled={loading} 
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
              >
                Test Connection
              </button>
            </div>
          </div>
        </div>

        {/* Agent Status */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">⚙️ Agent Status</h2>
          
          {agentStatus ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block font-medium mb-1">Agent Enabled</label>
                  <span className={`px-2 py-1 rounded text-sm ${
                    agentStatus.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agentStatus.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div>
                  <label className="block font-medium mb-1">Auto Replies</label>
                  <span className={`px-2 py-1 rounded text-sm ${
                    agentStatus.replyEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agentStatus.replyEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div>
                  <label className="block font-medium mb-1">Post Interval</label>
                  <p className="text-gray-600">{Math.round(agentStatus.postInterval / 60000)} minutes</p>
                </div>
                <div>
                  <label className="block font-medium mb-1">Should Post</label>
                  <span className={`px-2 py-1 rounded text-sm ${
                    agentStatus.shouldPost ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agentStatus.shouldPost ? 'Ready' : 'Waiting'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Loading agent status...</p>
          )}
        </div>

        {/* Manual Actions */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">📤 Manual Actions</h2>
          
          <div className="space-y-6">
            {/* Post Tweet */}
            <div>
              <button 
                onClick={postTweet} 
                disabled={loading} 
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Post SYMBI Tweet
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Posts a randomly selected SYMBI-themed tweet
              </p>
            </div>

            <hr className="border-gray-200" />

            {/* Reply to Tweet */}
            <div className="space-y-3">
              <label className="block font-medium">Reply to Tweet</label>
              <input
                type="text"
                placeholder="Tweet ID to reply to"
                value={replyTweetId}
                onChange={(e) => setReplyTweetId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Original tweet content (for context)"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button 
                 onClick={postReply} 
                 disabled={loading} 
                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
               >
                 Post SYMBI Reply
               </button>
            </div>

            <hr className="border-gray-200" />

            {/* Monitor and Respond */}
            <div className="space-y-3">
              <label className="block font-medium">Monitor & Auto-Respond</label>
              <input
                type="text"
                placeholder="Search query for monitoring"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button 
                 onClick={startMonitoring} 
                 disabled={loading} 
                 className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
               >
                 Start Monitoring
               </button>
              <p className="text-sm text-gray-600">
                Monitors tweets matching the query and responds with SYMBI perspective
              </p>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">📋 Setup Instructions</h2>
          
          <div className="text-sm space-y-2">
            <p><strong>1. X Developer Account:</strong> Make sure you have a basic X developer account</p>
            <p><strong>2. Environment Variables:</strong> Update your .env.local file with your X API credentials:</p>
            <div className="bg-gray-100 p-3 rounded font-mono text-xs">
              X_API_CLIENT_ID=your-client-id<br/>
              X_API_CLIENT_SECRET=your-client-secret<br/>
              X_API_ACCESS_TOKEN=your-access-token<br/>
              X_API_BEARER_TOKEN=your-bearer-token
            </div>
            <p><strong>3. Authentication:</strong> Click "Authenticate with X" to connect your account</p>
            <p><strong>4. Test:</strong> Use "Test Connection" to verify your setup</p>
            <p><strong>5. Start Posting:</strong> Use the manual actions or enable automatic posting</p>
          </div>
        </div>
      </div>
    </div>
  );
}
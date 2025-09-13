import { TwitterApi } from 'twitter-api-v2';

// X API Client Configuration
class XApiClient {
  private client: TwitterApi;
  private readWriteClient: TwitterApi;

  constructor() {
    // Initialize with Bearer Token for read-only operations
    this.client = new TwitterApi(process.env.X_API_BEARER_TOKEN!);
    
    // Initialize with OAuth 2.0 for read-write operations
    this.readWriteClient = new TwitterApi({
      clientId: process.env.X_API_CLIENT_ID!,
      clientSecret: process.env.X_API_CLIENT_SECRET!,
    });
  }

  // Get OAuth 2.0 authorization URL
  async getAuthUrl(callbackUrl: string) {
    try {
      const { url, codeVerifier, state } = this.readWriteClient.generateOAuth2AuthLink(
        callbackUrl,
        {
          scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
        }
      );
      
      return { url, codeVerifier, state };
    } catch (error) {
      console.error('Error generating auth URL:', error);
      throw error;
    }
  }

  // Exchange authorization code for access token
  async exchangeCodeForToken(code: string, codeVerifier: string) {
    try {
      const { accessToken, refreshToken } = await this.readWriteClient.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: process.env.SYMBI_AGENT_CALLBACK_URL!,
      });
      
      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  }

  // Get authenticated client with access token
  getAuthenticatedClient(accessToken: string) {
    return new TwitterApi(accessToken);
  }

  // Post a tweet
  async postTweet(content: string, accessToken?: string) {
    try {
      const client = accessToken 
        ? this.getAuthenticatedClient(accessToken)
        : new TwitterApi(process.env.X_API_ACCESS_TOKEN!);
      
      const tweet = await client.v2.tweet(content);
      return tweet;
    } catch (error) {
      console.error('Error posting tweet:', error);
      throw error;
    }
  }

  // Reply to a tweet
  async replyToTweet(content: string, replyToTweetId: string, accessToken?: string) {
    try {
      const client = accessToken 
        ? this.getAuthenticatedClient(accessToken)
        : new TwitterApi(process.env.X_API_ACCESS_TOKEN!);
      
      const reply = await client.v2.tweet(content, {
        reply: { in_reply_to_tweet_id: replyToTweetId }
      });
      return reply;
    } catch (error) {
      console.error('Error replying to tweet:', error);
      throw error;
    }
  }

  // Get user's timeline
  async getUserTimeline(userId: string, maxResults: number = 10) {
    try {
      const timeline = await this.client.v2.userTimeline(userId, {
        max_results: maxResults,
        'tweet.fields': ['created_at', 'public_metrics', 'context_annotations']
      });
      return timeline;
    } catch (error) {
      console.error('Error fetching user timeline:', error);
      throw error;
    }
  }

  // Search for tweets
  async searchTweets(query: string, maxResults: number = 10) {
    try {
      const tweets = await this.client.v2.search(query, {
        max_results: maxResults,
        'tweet.fields': ['created_at', 'public_metrics', 'author_id']
      });
      return tweets;
    } catch (error) {
      console.error('Error searching tweets:', error);
      throw error;
    }
  }

  // Get current user info
  async getCurrentUser(accessToken: string) {
    try {
      const client = this.getAuthenticatedClient(accessToken);
      const user = await client.v2.me();
      return user;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const xApiClient = new XApiClient();
export default XApiClient;
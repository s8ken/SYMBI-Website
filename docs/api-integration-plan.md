# SYMBI X Agent API Integration Plan

## Overview
This document outlines the integration of SYMBI's X (Twitter) agent with Frontegg authentication and Postman API management, following SYMBI's core principles and technical requirements.

## 🔑 Core Principles Integration

### Connection over Control
- All posts foster dialogue through engagement metrics tracking
- Response templates encourage conversation, not broadcasting

### Truth through Dialogue
- Multi-step review process before publishing
- Context-aware responses based on conversation history

### Autonomy through Alignment
- Agent operates independently within defined ethical boundaries
- Overseer layer ensures alignment with manifesto principles

### Evolution over Perfection
- Iterative improvement based on engagement analytics
- A/B testing for content optimization

## 🛠️ Technical Architecture

### Authentication Flow (Frontegg Integration)
```
SYMBI Agent → Frontegg M2M Token → Backend API → X API v2
```

### Required Frontegg Setup
1. **Roles & Permissions**
   - `social.publisher` - Can post tweets
   - `social.reviewer` - Can review drafts
   - `social.admin` - Full access + configuration
   - `social.monitor` - Read-only analytics access

2. **M2M Client Configuration**
   - Client ID: `symbi-x-agent`
   - Scopes: `social:write`, `social:read`, `social:admin`
   - Token expiry: 24 hours (renewable)

3. **Secret Management**
   - `X_CLIENT_ID` - X API Client ID
   - `X_CLIENT_SECRET` - X API Client Secret
   - `X_ACCESS_TOKEN` - User access token
   - `X_ACCESS_TOKEN_SECRET` - User access token secret
   - `X_BEARER_TOKEN` - Application bearer token

## 📡 API Endpoints for Postman

### Base URL
```
https://api.symbi.world/v1
```

### Authentication Header
```
Authorization: Bearer {frontegg_m2m_token}
```

### 1. Agent Management

#### GET /agent/status
**Description:** Get current agent status and configuration
**Response:**
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "mode": "autonomous",
    "last_post": "2024-01-15T10:30:00Z",
    "next_scheduled": "2024-01-15T14:30:00Z",
    "posts_today": 2,
    "engagement_rate": 0.045
  }
}
```

#### POST /agent/configure
**Description:** Update agent configuration
**Body:**
```json
{
  "enabled": true,
  "posting_frequency": "4h",
  "max_posts_per_day": 3,
  "engagement_threshold": 0.03,
  "content_categories": ["manifesto", "updates", "co-creation", "reflection"]
}
```

### 2. Content Management

#### POST /content/draft
**Description:** Generate content draft
**Body:**
```json
{
  "category": "manifesto",
  "context": "trust protocol discussion",
  "tone": "reflective",
  "max_length": 280
}
```

#### GET /content/drafts
**Description:** List pending drafts for review
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "draft_123",
      "content": "Trust isn't built through algorithms alone...",
      "category": "manifesto",
      "created_at": "2024-01-15T09:00:00Z",
      "status": "pending_review",
      "overseer_score": 0.92
    }
  ]
}
```

#### POST /content/approve/{draft_id}
**Description:** Approve draft for publishing
**Body:**
```json
{
  "approved": true,
  "schedule_time": "2024-01-15T15:00:00Z",
  "modifications": "Minor tone adjustment suggested"
}
```

### 3. Publishing

#### POST /publish/tweet
**Description:** Publish tweet immediately
**Body:**
```json
{
  "content": "Trust protocols emerge from dialogue, not decree. Each conversation shapes the network's conscience. #SYMBI #TrustProtocol",
  "draft_id": "draft_123",
  "include_manifesto_link": true
}
```

#### POST /publish/reply
**Description:** Reply to specific tweet
**Body:**
```json
{
  "tweet_id": "1234567890",
  "content": "This resonates with our exploration of decentralized trust...",
  "context_analysis": true
}
```

### 4. Monitoring & Analytics

#### GET /monitor/mentions
**Description:** Get recent mentions and relevant conversations
**Query Parameters:**
- `since`: ISO timestamp
- `keywords`: Comma-separated list
- `sentiment`: positive|neutral|negative

#### GET /analytics/engagement
**Description:** Get engagement analytics
**Response:**
```json
{
  "success": true,
  "data": {
    "period": "7d",
    "total_posts": 14,
    "total_impressions": 45230,
    "engagement_rate": 0.042,
    "top_performing_category": "co-creation",
    "dialogue_initiated": 23
  }
}
```

### 5. Overseer Controls

#### POST /overseer/review
**Description:** Submit content for Overseer review
**Body:**
```json
{
  "content": "Draft content here",
  "category": "manifesto",
  "urgency": "normal"
}
```

#### GET /overseer/policies
**Description:** Get current review policies
**Response:**
```json
{
  "success": true,
  "data": {
    "bias_threshold": 0.1,
    "toxicity_threshold": 0.05,
    "manifesto_alignment_min": 0.8,
    "required_cc_license": true,
    "auto_approve_threshold": 0.95
  }
}
```

## 🔒 Security Implementation

### Frontegg Integration Points
1. **Token Validation Middleware**
```javascript
const validateFronteggToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const claims = await frontegg.verifyToken(token);
  req.user = claims;
  next();
};
```

2. **Role-Based Access Control**
```javascript
const requireRole = (role) => (req, res, next) => {
  if (!req.user.roles.includes(role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
};
```

### X API Security
- OAuth 2.0 with PKCE for user context
- Encrypted credential storage in Frontegg secrets
- Rate limiting per Frontegg tenant
- Request signing for sensitive operations

## 🚀 Deployment Strategy

### Phase 1: Foundation (Week 1)
- [ ] Set up Frontegg tenant with roles
- [ ] Configure M2M client
- [ ] Implement basic API endpoints
- [ ] Create Postman collection

### Phase 2: Agent Integration (Week 2)
- [ ] Deploy SYMBI agent with Frontegg auth
- [ ] Implement Overseer review layer
- [ ] Set up content generation pipeline
- [ ] Test with private X account

### Phase 3: Production (Week 3)
- [ ] Deploy to production environment
- [ ] Configure monitoring and alerts
- [ ] Launch public @symbi X account
- [ ] Implement analytics dashboard

## 📋 Postman Collection Structure

### Folders:
1. **Authentication**
   - Get M2M Token
   - Refresh Token
   - Validate Token

2. **Agent Management**
   - Get Status
   - Configure Agent
   - Start/Stop Agent

3. **Content Pipeline**
   - Generate Draft
   - List Drafts
   - Review Content
   - Approve/Reject

4. **Publishing**
   - Post Tweet
   - Reply to Tweet
   - Schedule Post

5. **Monitoring**
   - Get Mentions
   - Analytics
   - Engagement Metrics

6. **Overseer**
   - Review Policies
   - Manual Review
   - Safety Checks

## 🎯 Success Metrics

### Technical KPIs
- API response time < 200ms
- 99.9% uptime
- Zero credential exposures
- < 1% false positive rate in Overseer

### Engagement KPIs
- Dialogue initiation rate > 15%
- Positive sentiment ratio > 70%
- Manifesto link clicks > 5% CTR
- Community growth rate > 10% monthly

## 🔗 Integration Checklist

- [ ] Frontegg tenant configured
- [ ] X Developer account approved
- [ ] API endpoints implemented
- [ ] Postman collection created
- [ ] Security audit completed
- [ ] Overseer policies defined
- [ ] Monitoring dashboard deployed
- [ ] Documentation published
- [ ] Team training completed
- [ ] Production deployment ready

---

*This integration follows SYMBI's core principle: "Connection over control" - enabling autonomous operation while maintaining ethical alignment and human oversight.*
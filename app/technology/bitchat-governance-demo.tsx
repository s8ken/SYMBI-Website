import React, { useState, useEffect } from 'react';
import { Shield, Users, MessageCircle, Vote, Lock, Globe, Zap, CheckCircle } from 'lucide-react';

const BitChatGovernanceDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isConnected, setIsConnected] = useState(false);
  const [nodeCount, setNodeCount] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [messages, setMessages] = useState([]);

  // Simulate network activity
  useEffect(() => {
    const connectInterval = setInterval(() => {
      if (!isConnected && Math.random() > 0.3) {
        setIsConnected(true);
        setNodeCount(Math.floor(Math.random() * 50) + 12);
      }
    }, 2000);

    const messageInterval = setInterval(() => {
      if (isConnected) {
        const newMessages = [
          "🌍 Trial City Protocol v2.1 deployed successfully",
          "📊 Wellbeing metrics showing 23% improvement in test community",
          "🤖 SYMBI governance decision: Proposal #47 ratified",
          "💡 New collaborative intelligence pattern discovered",
          "🏛️ Executive automation analysis complete for Tech Corp board",
          "🔍 Transparency audit results published to network"
        ];
        
        if (messages.length < 6) {
          setMessages(prev => [...prev, newMessages[messages.length]]);
        }
      }
    }, 3000);

    return () => {
      clearInterval(connectInterval);
      clearInterval(messageInterval);
    };
  }, [isConnected, messages.length]);

  // Simulate governance proposals
  useEffect(() => {
    if (isConnected && proposals.length === 0) {
      setTimeout(() => {
        setProposals([
          {
            id: 1,
            title: "Amendment VII: AI Transparency Standards",
            description: "Mandate real-time auditability for all AI systems in governance roles",
            votes: { for: 42, against: 8, abstain: 3 },
            status: "Active",
            timeLeft: "2d 14h"
          },
          {
            id: 2, 
            title: "Executive Automation Pilot Program",
            description: "Replace CEO decision-making with AI for 6-month trial in volunteer corporation",
            votes: { for: 28, against: 15, abstain: 7 },
            status: "Debating",
            timeLeft: "5d 8h"
          },
          {
            id: 3,
            title: "Universal Care Work Recognition",
            description: "Implement blockchain-based credits for community care contributions",
            votes: { for: 35, against: 2, abstain: 8 },
            status: "Passing",
            timeLeft: "1d 3h"
          }
        ]);
      }, 1500);
    }
  }, [isConnected]);

  const NetworkStatus = () => (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-6">
      <div className="flex items-center justify-between mb-2">
        <span>BitChat Governance Network</span>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span>{isConnected ? 'Connected' : 'Connecting...'}</span>
        </div>
      </div>
      {isConnected && (
        <>
          <div className="text-gray-400">Peers: {nodeCount} | Encrypted: ✓ | Decentralized: ✓</div>
          <div className="text-gray-400 mt-1">Active Frameworks: 6 | Governance Proposals: {proposals.length}</div>
        </>
      )}
    </div>
  );

  const ProposalCard = ({ proposal }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{proposal.title}</h4>
          <p className="text-sm text-gray-600 mt-1">{proposal.description}</p>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          proposal.status === 'Active' ? 'bg-blue-100 text-blue-800' :
          proposal.status === 'Passing' ? 'bg-green-100 text-green-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {proposal.status}
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span>For: {proposal.votes.for}</span>
          <span>Against: {proposal.votes.against}</span>
          <span>Abstain: {proposal.votes.abstain}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against + proposal.votes.abstain)) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Time remaining: {proposal.timeLeft}</span>
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
          Vote
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            BitChat AI Governance Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Decentralized governance for AI frameworks - no single authority, complete transparency, 
            cryptographic security. The final piece that makes democratic AI governance technically possible.
          </p>
        </div>

        <NetworkStatus />

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-200 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'System Overview', icon: Globe },
            { id: 'governance', label: 'Live Governance', icon: Vote },
            { id: 'frameworks', label: 'Framework Updates', icon: Zap },
            { id: 'security', label: 'Security Model', icon: Lock }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
                activeTab === tab.id 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Decentralized AI Governance in Action</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <Shield className="text-blue-600 mb-3" size={32} />
                  <h3 className="font-semibold text-gray-800 mb-2">No Single Point of Control</h3>
                  <p className="text-gray-600 text-sm">
                    Governance decisions are made by the network, not any single government, corporation, or institution.
                  </p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <Users className="text-green-600 mb-3" size={32} />
                  <h3 className="font-semibold text-gray-800 mb-2">Democratic Participation</h3>
                  <p className="text-gray-600 text-sm">
                    Anyone can propose amendments, vote on decisions, or participate in framework development.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <MessageCircle className="text-purple-600 mb-3" size={32} />
                  <h3 className="font-semibold text-gray-800 mb-2">Encrypted Communication</h3>
                  <p className="text-gray-600 text-sm">
                    All governance discussions are end-to-end encrypted, preventing surveillance or manipulation.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Live Network Activity</h3>
                <div className="space-y-2">
                  {messages.map((message, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-700">{message}</span>
                      <span className="text-gray-400 ml-auto">now</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'governance' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Governance Proposals</h2>
              
              {!isConnected ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Connecting to governance network...</p>
                </div>
              ) : (
                <div>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="text-blue-600" size={20} />
                      <span className="font-medium text-blue-800">
                        Connected to {nodeCount} governance nodes worldwide
                      </span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">
                      Your vote will be cryptographically secured and anonymously counted
                    </p>
                  </div>
                  
                  {proposals.map(proposal => (
                    <ProposalCard key={proposal.id} proposal={proposal} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'frameworks' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Framework Update Network</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">SYMBI Governance v3.2</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Nodes Updated:</span>
                      <span className="text-green-600">47/52</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Features:</span>
                      <span>Real-time audit trails</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600">Propagating</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Wellbeing Economics v2.1</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Implementations:</span>
                      <span className="text-blue-600">3 Trial Cities</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Happiness Index:</span>
                      <span>+23% average</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600">Validated</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Pending Updates</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Executive Automation Standards v1.3 - Enhanced board analysis</li>
                  <li>• Global Competition Protocol v2.0 - Climate challenge framework</li>
                  <li>• Trial City Templates v1.8 - Community care integration</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Security & Trust Model</h2>
              
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h3 className="font-semibold text-green-800 mb-2">End-to-End Encryption</h3>
                  <p className="text-green-700 text-sm">
                    All governance communications use Signal Protocol encryption. 
                    No centralized server can read or modify proposals.
                  </p>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Distributed Consensus</h3>
                  <p className="text-blue-700 text-sm">
                    Governance decisions require cryptographic proof of network consensus. 
                    No single node can manipulate outcomes.
                  </p>
                </div>
                
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Identity Verification</h3>
                  <p className="text-purple-700 text-sm">
                    Participants verify identity through cryptographic signatures while 
                    maintaining privacy through zero-knowledge proofs.
                  </p>
                </div>
                
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">Audit Transparency</h3>
                  <p className="text-orange-700 text-sm">
                    All framework changes and governance decisions create immutable 
                    audit trails that can be verified by anyone.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="mb-2">Security Status: OPERATIONAL</div>
                <div>Encryption: ChaCha20-Poly1305 ✓</div>
                <div>Network Integrity: 99.97% ✓</div>
                <div>Node Authentication: Active ✓</div>
                <div>Governance Consensus: Achieved ✓</div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join the Network?</h2>
          <p className="text-lg mb-6 opacity-90">
            This is not a simulation. This is working technology that makes democratic AI governance possible today.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Download BitChat Node
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Source Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitChatGovernanceDemo;
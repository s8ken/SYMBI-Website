"use client"

import { useState } from "react"

export default function TrustVisualization() {
  const [trustLevel, setTrustLevel] = useState(0.5)

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Trust Relationship Visualization</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Human → AI Trust</span>
          <div className="w-32 h-2 bg-gray-200 rounded">
            <div className="h-full bg-blue-500 rounded transition-all" style={{ width: `${trustLevel * 100}%` }} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>AI → Human Trust</span>
          <div className="w-32 h-2 bg-gray-200 rounded">
            <div className="h-full bg-green-500 rounded transition-all" style={{ width: `${trustLevel * 100}%` }} />
          </div>
        </div>
        <div className="text-sm text-gray-600">
          In Symbi, trust flows both ways. Both parties can see, verify, and adjust the relationship.
        </div>
      </div>
    </div>
  )
}

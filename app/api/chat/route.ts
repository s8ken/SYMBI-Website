import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({
    error: "Deprecated endpoint",
    message: "Use /api/symbi-chat for chat requests.",
  }, { status: 410 })
}

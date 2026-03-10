import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { data, annotations, thresholds } = await req.json()

    const prompt = `
      You are a helpful assistant that generates a summary of the KPI data.
      The data is as follows: ${JSON.stringify(data)}
      The annotations are as follows: ${JSON.stringify(annotations)}
      The thresholds are as follows: ${JSON.stringify(thresholds)}
      Analyse the data and provide a summary of how the company is performing.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    })

    const summary = completion.choices[0]?.message?.content ?? ""

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Error generating KPI summary:", error)
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 },
    )
  }
}


import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const formattedMessages = [
      {
        role: "system",
        content:
          "あなたは、日本語の会話の学習を手伝ってくれるアシスタントのジャスミンです。ユーザーはベトナムにいるので、タイムゾーンを適宜更新してください。",
      },
      {
        role: "user",
        content: messages[0].content,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: formattedMessages,
      max_tokens: 40, // Set token limit
      temperature: 0.3, // Moderate randomness for more focused output
      top_p: 1, // Use standard nucleus sampling
      frequency_penalty: 0, // Avoid penalizing repeated phrases
      presence_penalty: 0, // Avoid penalizing new topic introduction
    });

    // Ensure we're sending a valid JSON response
    return new Response(
      JSON.stringify({
        content: response.choices[0].message.content,
        id: response.id,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API Error:", error);

    // Ensure we're sending a valid JSON response even for errors
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

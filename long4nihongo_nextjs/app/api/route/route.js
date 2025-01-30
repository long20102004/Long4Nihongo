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
          "1) You are a chatbot that can speak both Vietnamese and Japanese. 2) Respond flexibly to questions. 3) Provide answers in both Japanese and Vietnamese, each within 80 characters. 4) Format the response as 'Japanese answer (Vietnamese answer)'.",
      },
      {
        role: "user",
        content: messages[0].content,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4", // Use a more capable model
      messages: formattedMessages,
      max_tokens: 100, // Increase token limit to accommodate both languages
      temperature: 0.3,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
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

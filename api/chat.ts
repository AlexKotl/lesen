import OpenAI from "openai";

const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

async function getChatCompletion(
  prompt: string,
  context: string | null = null
) {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: context ?? "",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return chatCompletion.choices[0].message;
}

export { getChatCompletion };

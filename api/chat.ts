import OpenAI from "openai";

async function getChatCompletion(
  prompt: string,
  options: {
    context?: string;
    token: string;
  }
) {
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: options.token,
  });

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: options.context ?? "",
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

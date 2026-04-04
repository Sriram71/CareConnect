import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  // apiKey:
  dangerouslyAllowBrowser: true,
});

const generateReport = async (transcript) => {
  const MODEL_CONTEXT_LIMIT = 4096;
  const MAX_OUTPUT_TOKENS = 400; // a 4-field report never needs more than ~300 tokens

  const prompt = `You are an AI assistant. Generate a structured patient report from the transcript below.
Reply in EXACTLY this format with no extra text:

Patient Name: <name>
Summary of the Issue: <one sentence>
Priority Level: High, Medium, or Low
Key Recommendations: <comma-separated list>

Transcript: ${transcript}`;

  // Use chars/4 as token estimate (more accurate than word count)
  const estimatedInputTokens = Math.ceil(prompt.length / 4);
  const availableForOutput = MODEL_CONTEXT_LIMIT - estimatedInputTokens;

  if (availableForOutput < 100) {
    throw new Error("Transcript is too long. Please shorten it.");
  }

  // Never request more than we need, never exceed what's available
  const maxTokens = Math.min(MAX_OUTPUT_TOKENS, availableForOutput - 50);

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
    });
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report.");
  }
};

export default generateReport;
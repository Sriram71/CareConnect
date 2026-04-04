import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: "",
  dangerouslyAllowBrowser: true,
});

const generateReport = async (transcript) => {
  const MODEL_CONTEXT_LIMIT = 4096;
  const MAX_OUTPUT_TOKENS = 400;

  const systemPrompt = `You are a medical report generator. Your only job is to read a patient interview transcript and output a structured report.
You must ALWAYS reply in EXACTLY this format — no extra text, no explanations, no questions:

Patient Name: <patient's full name>
Summary of the Issue: <one sentence describing the main complaint>
Priority Level: High, Medium, or Low
Key Recommendations: <comma-separated list of recommended actions>`;

  const userPrompt = `Here is the patient interview transcript. Generate the structured report now.

--- TRANSCRIPT START ---
${transcript}
--- TRANSCRIPT END ---

Patient Name:`;

  const estimatedInputTokens = Math.ceil((systemPrompt.length + userPrompt.length) / 4);
  const availableForOutput = MODEL_CONTEXT_LIMIT - estimatedInputTokens;

  if (availableForOutput < 100) {
    throw new Error("Transcript is too long. Please shorten it.");
  }

  const maxTokens = Math.min(MAX_OUTPUT_TOKENS, availableForOutput - 50);

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userPrompt },
      ],
      max_tokens: maxTokens,
    });

    // The model continues from "Patient Name:" so we prepend it back
    const content = chatCompletion.choices[0].message.content;
    return `Patient Name: ${content}`;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report.");
  }
};

export default generateReport;
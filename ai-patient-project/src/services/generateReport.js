import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const generateReport = async (transcript) => {
  const systemPrompt = `You are a medical report generator. Your only job is to read a patient interview transcript and output a structured report.
You must ALWAYS reply in EXACTLY this format — no extra text, no explanations, no questions:

Patient Name: <patient's full name>
Summary of the Issue: <one sentence describing the main complaint>
Priority Level: High, Medium, or Low
Key Recommendations: <comma-separated list of recommended actions>`;

  const userPrompt = `Here is the patient interview transcript. Generate the structured report now.

--- TRANSCRIPT START ---
${transcript}
--- TRANSCRIPT END ---`;

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userPrompt },
      ],
      max_tokens: 400,
      temperature: 0,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report.");
  }
};

export default generateReport;
// import { OpenAI } from "openai";

// const client = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// const generateReport = async (transcript) => {
//   const systemPrompt = `You are a medical report generator. Your only job is to read a patient interview transcript and output a structured report.
// You must ALWAYS reply in EXACTLY this format — no extra text, no explanations, no questions:

// Patient Name: <patient's full name>
// Summary of the Issue: <one sentence describing the main complaint>
// Priority Level: High, Medium, or Low
// Key Recommendations: <comma-separated list of recommended actions>`;

//   const userPrompt = `Here is the patient interview transcript. Generate the structured report now.

// --- TRANSCRIPT START ---
// ${transcript}
// --- TRANSCRIPT END ---`;

//   try {
//     const chatCompletion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user",   content: userPrompt },
//       ],
//       max_tokens: 400,
//       temperature: 0,
//     });

//     return chatCompletion.choices[0].message.content;
//   } catch (error) {
//     console.error("Error generating report:", error);
//     throw new Error("Failed to generate report.");
//   }
// };

// export default generateReport;

import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const generateReport = async (transcript) => {
  const systemPrompt = `You are a medical report assistant. Read the patient interview transcript and output a structured report.
You must ALWAYS reply in EXACTLY this format — no extra text, no preamble, no markdown:

Patient Name: <patient's full name>
Summary of the Issue: <one clear sentence describing the main complaint>
Priority Level: High, Medium, or Low
Key Recommendations: <comma-separated list of immediate actions the patient or doctor should take>
Do's: <comma-separated list of things the patient SHOULD do right now while waiting for care>
Don'ts: <comma-separated list of things the patient MUST AVOID doing>
Medicines and Supplements: <comma-separated list of safe OTC medicines or supplements that may help, with brief reason. If none are appropriate, write: None — consult a doctor before taking anything>`;

  const userPrompt = `Here is the patient interview transcript. Generate the full structured report now.

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
      max_tokens: 700,
      temperature: 0,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Failed to generate report.");
  }
};

export default generateReport;
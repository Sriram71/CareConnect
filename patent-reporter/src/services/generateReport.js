import axios from 'axios';

const generateReport = async (transcript) => {
  const apiKey = import.meta.env.VITE_HF_API_KEY;
  const apiUrl = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

  const prompt = `You are an AI assistant tasked with generating a structured patent report based on the following transcript. The report must be exactly 200 words and include:

- Patient/Inventor Name
- Invention Summary
- Priority Level (High/Medium/Low)
- Key Claims
- Recommended Next Steps for the Doctor

Transcript: ${transcript}`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const data = {
    inputs: prompt,
  };

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const response = await axios.post(apiUrl, data, { headers });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle rate limit errors
        console.warn('Rate limit exceeded. Retrying in 3 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        retries += 1;
      } else {
        console.error('Error generating report:', error);
        throw new Error('Failed to generate report.');
      }
    }
  }

  throw new Error('Max retries reached. Please try again later.');
};

export default generateReport;
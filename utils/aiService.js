import Groq from 'groq-sdk';

// Initialize Groq client. Will throw if process.env.GROQ_API_KEY is missing.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

/**
 * Generate completion using Groq LLM
 */
export const generateCompletion = async ({
  messages,
  model = DEFAULT_MODEL,
  temperature = 0.7,
  max_tokens = 1024,
}) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model,
      temperature,
      max_tokens,
    });
    
    return chatCompletion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq AI Service Error:', error);
    throw new Error('Failed to generate AI response');
  }
};

/**
 * Summarize property description and generate tags
 */
export const analyzeProperty = async (title, description) => {
  const prompt = `
    Analyze the following real estate property.
    Title: ${title}
    Description: ${description}
    
    Respond in JSON format with two fields:
    1. "summary": A concise, appealing 2-3 sentence summary.
    2. "tags": An array of 3-5 keywords/tags (e.g., "Minimalist", "Family Friendly", "City View").
  `;

  try {
    const response = await generateCompletion({
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2, // low temp for structured output
    });

    // Attempt to parse JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return { summary: '', tags: [] };
  } catch (err) {
    console.error('Error analyzing property:', err);
    return { summary: '', tags: [] };
  }
};

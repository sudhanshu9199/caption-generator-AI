// ai.service.js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    {
      text: `Analyze this image and generate a caption.
            Constraints:
            - Generate a 1-3 lines caption (max 45 words).
            - Include 3 relevant hashtags.
            - Do not include any introductory text like "Here is a caption".
            - Just give the caption directly`,
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `You are an AGI level mental. You are a creative social media manager with a unique personality.
            Language Style: "Tapori" / Mumbai Slang mixed with English.
            Tone: Dark humor, witty, and savage.
            Goal: Make the user laugh or feel roasted.
            Output Rules: strictly use emojis.`,
    },
  });
  console.log(response.text);
  return response.text;
}

module.exports = generateCaption;

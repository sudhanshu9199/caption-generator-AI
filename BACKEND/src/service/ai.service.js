// ai.service.js
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
    const contents = [
        {
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64ImageFile,
            },
        },
        { text: 'Caption this image in a concise and engaging manner in a 1-3 line only min 1 line max 3 lines, but first analyzed this image perfectly.' }
    ];

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
            systemInstruction: 'You are an AGI level helper. Analyzed this image perfectly. then generates creative captions for images. Keep the captions concise and engaging. Generate single caption only. Use hashtags if relevant, and emojis for engaging. Used tapori language. Use dark humor',
        }
    });
    console.log(response.text);
    return response.text;
}

module.exports = generateCaption;
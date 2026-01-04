import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, CarouselData } from "../types";

const characterSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Name of the character" },
    role: { type: Type.STRING, description: "Role in the story/carousel (e.g. Protagonist, Mentor)" },
    personality: { type: Type.STRING, description: "Personality traits and dialect notes" },
    visualDescription: { type: Type.STRING, description: "Physical appearance description" },
    imagePrompt: { type: Type.STRING, description: "A detailed Midjourney/DALL-E prompt to generate this character individually. ALWAYS IN ENGLISH." },
  },
  required: ["name", "role", "personality", "visualDescription", "imagePrompt"],
};

const slideSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    slideNumber: { type: Type.INTEGER },
    type: { type: Type.STRING, enum: ["hook", "content", "transition", "cta"] },
    headline: { type: Type.STRING, description: "Main headline text for the slide overlay. In the requested output language." },
    bodyText: { type: Type.STRING, description: "Supporting body text for the slide overlay. In the requested output language." },
    visualDescription: { type: Type.STRING, description: "Description of the visual composition. In the requested output language." },
    imagePrompt: { type: Type.STRING, description: "A highly detailed image generation prompt for this specific slide background/visual. ALWAYS IN ENGLISH." },
    speakerNotes: { type: Type.STRING, description: "Caption or script for the post description related to this slide. In the requested output language." },
  },
  required: ["slideNumber", "type", "headline", "bodyText", "visualDescription", "imagePrompt", "speakerNotes"],
};

const carouselSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy title for the carousel project. In the requested output language." },
    overview: { type: Type.STRING, description: "Brief executive summary of the carousel flow. In the requested output language." },
    targetAudienceAnalysis: { type: Type.STRING, description: "Analysis of why this structure fits the audience. In the requested output language." },
    toneDialectNotes: { type: Type.STRING, description: "Notes on how to maintain the specific tone and dialect requested. In the requested output language." },
    characters: {
      type: Type.ARRAY,
      items: characterSchema,
      description: "List of key characters appearing in the carousel (if any). If abstract, describe the 'Persona' or 'Guide'."
    },
    slides: {
      type: Type.ARRAY,
      items: slideSchema,
      description: "Ordered list of slides"
    },
  },
  required: ["title", "overview", "targetAudienceAnalysis", "toneDialectNotes", "characters", "slides"],
};

export const generateCarouselContent = async (inputs: UserInput): Promise<CarouselData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const languageInstruction = inputs.language === 'ar' 
    ? "IMPORTANT: The output content (Title, Headlines, Body Text, Scripts, Analysis) MUST BE IN ARABIC. However, the 'imagePrompt' fields MUST remain in ENGLISH."
    : "IMPORTANT: The output content MUST BE IN ENGLISH.";

  const prompt = `
    Act as a world-class Social Media Strategist and Creative Director.
    Create a comprehensive plan for a social media carousel.

    Input Parameters:
    - Language: ${inputs.language === 'ar' ? 'Arabic' : 'English'}
    - Concept/Topic: ${inputs.concept}
    - Platform: ${inputs.platform}
    - Primary Goal: ${inputs.goal}
    - Target Audience: ${inputs.targetAudience}
    - Desired Tone/Dialect: ${inputs.tone}
    - Call to Action (CTA): ${inputs.cta || "Standard engagement"}
    - Visual/Art Style: ${inputs.artStyle}
    - Number of Slides: ${inputs.slideCount}
    - Additional Context: ${inputs.additionalContext || "None"}

    Requirements:
    1. ${languageInstruction}
    2. Analyze the audience and tone to ensure the copy matches perfectly.
    3. Create a storyboard with ${inputs.slideCount} slides.
    4. For each slide, write the overlay text (Headline + Body) and the caption/script.
    5. GENERATE HIGH-QUALITY IMAGE PROMPTS: For every character and slide, write a detailed, prompt-engineered string suitable for Midjourney v6 or DALL-E 3. Include lighting, camera angles, style keywords ('${inputs.artStyle}'), and composition details in these prompts. KEEP THESE PROMPTS IN ENGLISH.
    6. If the concept implies a story, define the characters. If it's educational, define the "Persona" teaching the content.
    7. Optimization: Ensure the content length and structure fits the selected platform (${inputs.platform}).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: carouselSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response generated");
    
    return JSON.parse(text) as CarouselData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

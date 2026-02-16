
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePersonalizedBlessing = async (name: string) => {
  const ai = getAI();
  const prompt = `Generate a short, festive, and personalized Lunar New Year blessing for a lab member named ${name}. 
  The blessing should randomly draw from one of these 5 specific "Lab Superstitions/Themes":
  1. Wealth/Funding: Getting lots of grants and scholarships.
  2. Academic Fame: Nature/Science papers accepted without revisions.
  3. Health/Sleep: Sleeping at 1 AM and waking at 9 AM (escaping the all-nighter cycle).
  4. Appearance/Stress: Thick hair and a solid hairline despite heavy workloads.
  5. Experimental Success: P-values < 0.05 on the first try, perfect cell cultures.

  The tone should be a mix of "Academic Lab Humor" and "Warm New Year Wishes".
  Return a JSON object with:
  - icon: An appropriate emoji for the theme.
  - title: A short title like "暴富签", "顶刊签", "神仙作息签", "浓密签", or "锦鲤签".
  - content: The personalized greeting text (1-2 sentences in Chinese).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            icon: { type: Type.STRING },
            title: { type: Type.STRING },
            content: { type: Type.STRING }
          },
          required: ["icon", "title", "content"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback based on user-provided library
    const fallbacks = [
      { icon: "💰", title: "暴富签", content: "新的一年科研经费拿到手软，横向课题接到腿软，奖学金统统拿下！" },
      { icon: "🎓", title: "顶刊签", content: "Nature / Science 随便投，审稿人无条件 Accept！文章写得犹如神助！" },
      { icon: "🌙", title: "神仙作息签", content: "告别通宵肝 DDL！祝你完美达成凌晨 1 点睡、早晨 9 点起的护肝作息！" },
      { icon: "🧑‍🦱", title: "浓密签", content: "无论跑多少次电泳、改多少遍论文，你的发际线坚如磐石，发量惊人！" },
      { icon: "🧪", title: "锦鲤签", content: "实验一次就 Success，无脑跑出阳性结果。P值永远小于0.05！" }
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
};

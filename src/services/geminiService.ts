import { GoogleGenAI } from "@google/genai";

// Fix: Replaced local VLLM implementation with Gemini API to adhere to project requirements
// and fix the `import.meta.env` error by using the correct API client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateWorldDescription(base64Image: string, mimeType: string): Promise<string> {
  try {
    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Image,
      },
    };

    const textPart = {
      text: `分析这张描绘某个地方的图片。请基于这个场景，生动、沉浸式地描述一个可供探索的3D世界。
      重点描述以下方面：
      1.  整体氛围和情绪基调 (例如：宁静、怀旧、繁华、神秘)。
      2.  时间和天气 (例如：一个慵懒的夏日午后，微风拂面；一个雨后的清晨，空气清新)。
      3.  感官细节 (例如：能听到远处传来的鸟鸣或市井的嘈杂声，能闻到潮湿泥土或街边小吃的香气)。
      4.  可能的互动点 (例如：可以推开那扇吱呀作响的旧木门，可以坐在河边的长椅上)。
      5.  光影效果 (例如：阳光透过树叶的缝隙洒下斑驳的光影，霓虹灯在湿漉漉的街道上反射出迷离的光彩)。
      让描述听起来像一个引人入胜的游戏世界或虚拟体验的介绍。请使用中文回答。`,
    };
    
    // Fix: Using Gemini API to generate content with image and text parts.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    // Fix: Accessing text directly from the response object.
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate description from Gemini API.");
  }
}

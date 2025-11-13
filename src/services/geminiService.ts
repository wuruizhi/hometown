// Use relative paths that will be intercepted by the Vite proxy
const VLLM_CHAT_ENDPOINT = '/vllm-api/v1/chat/completions';
const MODEL_NAME = "/home/ubuntu/data/LLM_base_models/Qwen/Qwen2.5-1.5B";

/**
 * A generic handler for making POST requests to the vLLM server.
 * @param endpoint The API endpoint to hit (e.g., /v1/chat/completions).
 * @param payload The JSON payload to send.
 * @returns The JSON response from the server.
 */
async function postToVllm(endpoint: string, payload: object): Promise<any> {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("vLLM API Error Response:", errorBody);
        throw new Error(`vLLM 服务器返回错误: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("调用本地 vLLM API 时出错:", error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        // With the proxy, the problem is likely that the server is down.
        throw new Error("无法连接到本地 vLLM 服务器。请确保您的 vLLM 服务正在 http://localhost:8001 上运行, 并且检查启动服务的终端窗口是否有错误信息。");
    }
    if (error instanceof Error) {
        throw new Error(`调用 vLLM 服务失败: ${error.message}`);
    }
    throw new Error("调用 vLLM 服务时发生未知错误。");
  }
}

/**
 * Generates a world description from an image using the chat completions endpoint,
 * as this is required for multimodal input.
 */
export async function generateWorldDescription(base64Image: string, mimeType: string): Promise<string> {
  const payload = {
    model: MODEL_NAME,
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": `分析这张描绘某个地方的图片。请基于这个场景，生动、沉浸式地描述一个可供探索的3D世界。
    重点描述以下方面：
    1.  整体氛围和情绪基调 (例如：宁静、怀旧、繁华、神秘)。
    2.  时间和天气 (例如：一个慵懒的夏日午后，微风拂面；一个雨后的清晨，空气清新)。
    3.  感官细节 (例如：能听到远处传来的鸟鸣或市井的嘈杂声，能闻到潮湿泥土或街边小吃的香气)。
    4.  可能的互动点 (例如：可以推开那扇吱呀作响的旧木门，可以坐在河边的长椅上)。
    5.  光影效果 (例如：阳光透过树叶的缝隙洒下斑驳的光影，霓虹灯在湿漉漉的街道上反射出迷离的光彩)。
    让描述听起来像一个引人入胜的游戏世界或虚拟体验的介绍。请使用中文回答。`,
          },
          {
            "type": "image_url",
            "image_url": {
              "url": `data:${mimeType};base64,${base64Image}`
            }
          }
        ]
      }
    ],
    max_tokens: 1500,
    temperature: 0.7,
  };
  
  const data = await postToVllm(VLLM_CHAT_ENDPOINT, payload);

  if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content.trim();
  } else {
      console.error("来自 vLLM 的聊天响应结构意外:", data);
      throw new Error("解析 vLLM 聊天响应失败。");
  }
}

/**
 * Generates a text response using the chat completions endpoint.
 * This is used for the text chat test module.
 */
export async function generateChatResponse(prompt: string): Promise<string> {
    const payload = {
      model: MODEL_NAME,
      messages: [ // Use 'messages' array
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    };

    // Use the chat endpoint for all calls
    const data = await postToVllm(VLLM_CHAT_ENDPOINT, payload);

    if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content.trim();
    } else {
        console.error("来自 vLLM 的聊天响应结构意外:", data);
        throw new Error("解析 vLLM 聊天响应失败。");
    }
}
const VLLM_API_ENDPOINT = 'http://localhost:8001/v1/chat/completions';
const MODEL_NAME = "/home/ubuntu/data/LLM_base_models/Qwen/Qwen2.5-1.5B";

export async function generateWorldDescription(base64Image: string, mimeType: string): Promise<string> {
  try {
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

    const response = await fetch(VLLM_API_ENDPOINT, {
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

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        return data.choices[0].message.content;
    } else {
        console.error("来自 vLLM 的响应结构意外:", data);
        throw new Error("解析 vLLM 服务器响应失败。");
    }

  } catch (error) {
    console.error("调用本地 vLLM API 时出错:", error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error("无法连接到本地 vLLM 服务器。请确保服务正在运行，并且已启用跨域资源共享 (CORS)。您可能需要在启动脚本中添加 --cors-allowed-origins \"*\" 参数。");
    }
    if (error instanceof Error) {
        throw new Error(`调用 vLLM 服务失败: ${error.message}`);
    }
    throw new Error("调用 vLLM 服务时发生未知错误。");
  }
}
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { keywords } = req.body;
    if (!keywords || typeof keywords !== 'string' || !keywords.trim()) {
      return res.status(400).json({ error: "키워드를 성실히 기입해 주세요." });
    }

    // Check request header first, fallback to environment variable
    const apiKey = req.headers['x-custom-api-key'] || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: "GEMINI_API_KEY 환경변수가 설정되지 않았습니다. Vercel 프로젝트 설정에서 Environment Variables를 추가해 주시거나, 화면 하단에서 본인의 구글 AI 스튜디오 API 키를 직접 입력해 주세요." });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const prompt = `당신은 독도의 역사적 권원, 지리적 중요성 및 평화적 상생을 공부한 한일 중·고등 청소년을 돕는 다정하고 깊이 있는 소감문 집필 멘토입니다.
학습자가 제공한 키워드들을 자연스럽게 활용하여 감동적이고 역사적으로 균형 잡힌 독도 학습 성찰 소감문(독도 공존과 평화의 배움 소감)을 작성해 주세요.

제시된 키워드:
"${keywords}"

서술 요건:
- 분량: 400~600자 내외로 단정하고 정갈하게 작성할 것.
- 어조: 정중하고 따뜻하며 성숙한 존댓말 문체(~합니다, ~배웠습니다).
- 가치관: 감정적인 대립이나 공격적인 멸칭을 일체 제하고, 사료적 객관성과 평화적 미래 지향성에 입각하여 작성할 것.
- 형식: 시작 인사 및 끝 인사를 제거하고 오직 소감문 알맹이 본문 내용만 한 단락 또는 두 단락의 깊이 있고 매끄러운 흐름으로 깔끔하게 출력해 주세요.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const generatedText = response.text || "";
    return res.json({ essay: generatedText.trim() });
  } catch (error: any) {
    console.error("Vercel Serverless Function - Gemini Error:", error);
    return res.status(500).json({ error: error.message || "소감문 생성 중 서버 오류가 발생했습니다." });
  }
}

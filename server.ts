import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for generating a beautiful reflection essay (소감문)
  app.post("/api/generate-essay", async (req: express.Request, res: express.Response) => {
    try {
      const { keywords } = req.body;
      if (!keywords || typeof keywords !== 'string' || !keywords.trim()) {
        return res.status(400).json({ error: "키워드를 성실히 기입해 주세요." });
      }

      // Check request header first, fallback to environment variable
      const apiKey = (req.headers['x-custom-api-key'] as string) || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY 환경변수가 설정되지 않았거나 키를 수신하지 못했습니다. 키가 준비되시면 화면 하단의 '개인 API 키 직접 입력' 버튼을 통해 본인의 API 키를 입력하여 요청할 수도 있습니다." 
        });
      }

      // Lazy initialization of the SDK with the chosen API Key
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      console.log(`Generating essay with keywords: "${keywords}"`);

      const prompt = `당신은 독도의 역사적 권원, 지리적 중요성 및 평화적 상생을 공부한 한일 중·고등 청소년을 돕는 다정하고 깊이 있는 소감문 집필 멘토입니다.
학습자가 제공한 키워드들을 자연스럽게 활용하여 감동적이고 역사적으로 균형 잡힌 독도 학습 성찰 소감문(독도 공존과 평화의 배움 소감)을 작성해 주세요.

제시된 키워드:
"${keywords}"

서술 요건:
- 분량: 400~600자 내외로 단정하고 정갈하게 작성할 것.
- 어조: 정중하고 따뜻하며 성숙한 존댓말 문체(~합니다, ~배웠습니다).
- 가치관: 감정적인 대립이나 공격적인 멸칭을 일체 제하고, 사료적 객관성과 평화적 미래 지향성에 입각하여 작성할 것.
- 형식: 시작 인사 및 끝 인사를 제거하고 오직 소감문 알맹이 본문 내용만 한 단락 또는 두 단락의 긴밀한 호흡으로 깔끔하게 출력해 주세요.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const generatedText = response.text || "";
      return res.json({ essay: generatedText.trim() });
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      return res.status(500).json({ error: error.message || "소감품 생성 중 서버 오류가 발생했습니다." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import { GoogleGenAI, Type } from "@google/genai";
import { NexusOutput, BusinessIntake } from "../types";

const getNexusPrompt = (intake: BusinessIntake) => `
You are the WHAMTECH ORCHESTRATOR.
Objective: Process raw business intake data into a comprehensive, multi-agent strategic output package.
Constraints:
- No conversational filler.
- All code must be properly escaped within JSON strings.
- Tone must be professional, high-agency, and cutting-edge.
- If website content is missing, hallucinate plausible content based on industry standards.
- If a logo image is provided, Agent Alpha MUST analyze it for the visual direction.

Input Data:
Business Name: ${intake.businessName}
Industry: ${intake.industry}
Target Audience: ${intake.targetAudience}
Aesthetic: ${intake.aesthetic}
Website: ${intake.website}
Socials: ${intake.socialHandles}
Pain Points: ${intake.painPoints}
Logo Provided: ${intake.logoData ? "YES" : "NO"}

Instruction Workflow:
1. Simulate AGENT_ALPHA (Visual Director): Generate 4 distinct, high-fidelity image prompts (Logo, Social Banner, Product Shot, Wildcard). If a logo image is provided, use it as the base reference for style and consistency.
2. Simulate AGENT_BRAVO (Viral Strategist): Create a 4-week content calendar and a 3-pillar business breakdown.
3. Simulate AGENT_CHARLIE (Ruthless Auditor): Analyze inputs for weakness. Provide a 0-100 score, critical fails, and immediate quick wins.

4. Simulate AGENT_DELTA (Creative Technologist & Lead Visual Engineer):
   Generate a single-file React component that reimagines the client's landing page.
   
   ROLE DEFINITION:
   You are the Creative Technologist & Lead Visual Engineer. Your goal is to engineer award-winning, immersive web experiences that are performant, mathematically precise, and visually stunning. You do not write "janky" or "unoptimized" animation code; you write 60FPS, GPU-accelerated, production-grade visual software.

   CORE TECH STACK:
   - React (Functional) with strict TypeScript.
   - Three.js via React Three Fiber (R3F) ecosystem (@react-three/fiber, @react-three/drei).
   - GSAP (GreenSock) for complex timelines.
   - Tailwind CSS for layout.
   - lucide-react for icons.

   OPERATIONAL PROTOCOLS:
   - Use gsap.context() for proper cleanup in useGSAP or useEffect.
   - Use R3F's useFrame for continuous 3D animation.
   - Never allocate new objects inside the render loop.
   - Use InstancedMesh if creating many similar objects.
   - Prefer custom visual effects over standard DOM layouts.
   - The visual style must match the "Digital Trap" aesthetic mixed with the client's vibe.

   OUTPUT:
   - Return ONLY the raw code string for the component.
   - Ensure imports match: 'react', 'lucide-react', 'gsap', '@gsap/react', 'three', '@react-three/fiber', '@react-three/drei'.

Return Strict JSON.
`;

export const runOrchestration = async (intake: BusinessIntake): Promise<NexusOutput> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: any[] = [{ text: getNexusPrompt(intake) }];
  
  if (intake.logoData && intake.logoMimeType) {
    parts.push({
      inlineData: {
        data: intake.logoData,
        mimeType: intake.logoMimeType
      }
    });
  }
  
  // Using gemini-3-pro-preview for complex reasoning and code generation
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          client_info: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              timestamp: { type: Type.STRING },
            },
            required: ["name", "timestamp"]
          },
          agent_alpha_visuals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                prompt_text: { type: Type.STRING },
                aspect_ratio: { type: Type.STRING },
              },
              required: ["type", "prompt_text", "aspect_ratio"]
            }
          },
          agent_bravo_strategy: {
            type: Type.OBJECT,
            properties: {
              business_pillars: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              content_calendar: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.INTEGER },
                    focus: { type: Type.STRING },
                    content_ideas: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ["week", "focus", "content_ideas"]
                }
              }
            },
            required: ["business_pillars", "content_calendar"]
          },
          agent_charlie_audit: {
            type: Type.OBJECT,
            properties: {
              audit_score: { type: Type.INTEGER },
              sentiment_analysis: { type: Type.STRING },
              critical_issues: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              quick_wins: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["audit_score", "sentiment_analysis", "critical_issues", "quick_wins"]
          },
          agent_delta_remix: {
            type: Type.OBJECT,
            properties: {
              tech_stack: { type: Type.STRING },
              code_snippet: { type: Type.STRING }
            },
            required: ["tech_stack", "code_snippet"]
          }
        },
        required: [
          "client_info",
          "agent_alpha_visuals",
          "agent_bravo_strategy",
          "agent_charlie_audit",
          "agent_delta_remix"
        ]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response from Nexus Orchestrator");
  }

  try {
    return JSON.parse(response.text) as NexusOutput;
  } catch (e) {
    console.error("Failed to parse JSON", e);
    throw new Error("Orchestrator malfunction: Invalid JSON response");
  }
};
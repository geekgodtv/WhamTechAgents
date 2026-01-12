export interface AgentAlphaVisual {
  type: string;
  prompt_text: string;
  aspect_ratio: string;
}

export interface AgentBravoStrategy {
  business_pillars: string[];
  content_calendar: {
    week: number;
    focus: string;
    content_ideas: string[];
  }[];
}

export interface AgentCharlieAudit {
  audit_score: number;
  sentiment_analysis: string;
  critical_issues: string[];
  quick_wins: string[];
}

export interface AgentDeltaRemix {
  tech_stack: string;
  code_snippet: string;
}

export interface ClientInfo {
  name: string;
  timestamp: string;
}

export interface NexusOutput {
  client_info: ClientInfo;
  agent_alpha_visuals: AgentAlphaVisual[];
  agent_bravo_strategy: AgentBravoStrategy;
  agent_charlie_audit: AgentCharlieAudit;
  agent_delta_remix: AgentDeltaRemix;
}

export interface BusinessIntake {
  businessName: string;
  industry: string;
  targetAudience: string;
  aesthetic: string;
  website: string;
  socialHandles: string;
  painPoints: string;
  logoData?: string; // Base64 string
  logoMimeType?: string;
}

export enum AgentStatus {
  IDLE = 'IDLE',
  THINKING = 'THINKING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

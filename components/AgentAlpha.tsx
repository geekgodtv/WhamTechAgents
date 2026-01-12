import React from 'react';
import { AgentAlphaVisual } from '../types';
import { Eye, Image as ImageIcon, Copy } from 'lucide-react';

interface AgentAlphaProps {
  visuals: AgentAlphaVisual[];
}

const AgentAlpha: React.FC<AgentAlphaProps> = ({ visuals }) => {
  return (
    <div className="bg-slate-900/40 border border-purple-500/30 rounded-lg p-6 h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Eye size={120} />
      </div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded border border-purple-500/50 text-purple-400">
          <ImageIcon size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight">AGENT_ALPHA</h2>
          <p className="text-xs text-purple-400 font-mono">VISUAL DIRECTOR</p>
        </div>
      </div>

      <div className="space-y-4">
        {visuals.map((visual, idx) => (
          <div key={idx} className="group relative bg-black/40 border border-slate-800 p-4 rounded hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono bg-slate-800 px-2 py-0.5 rounded">
                {visual.type}
              </span>
              <span className="text-xs text-slate-600 font-mono">{visual.aspect_ratio}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              "{visual.prompt_text}"
            </p>
            <button 
              className="absolute top-2 right-2 p-1.5 bg-slate-800 text-slate-400 rounded opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
              onClick={() => navigator.clipboard.writeText(visual.prompt_text)}
              title="Copy Prompt"
            >
              <Copy size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentAlpha;

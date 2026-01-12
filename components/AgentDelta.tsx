import React, { useState } from 'react';
import { AgentDeltaRemix } from '../types';
import { Code2, Clipboard, Check } from 'lucide-react';

interface AgentDeltaProps {
  remix: AgentDeltaRemix;
}

const AgentDelta: React.FC<AgentDeltaProps> = ({ remix }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(remix.code_snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/40 border border-lime-500/30 rounded-lg p-6 h-full relative overflow-hidden flex flex-col">
       <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Code2 size={120} />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-lime-500/20 rounded border border-lime-500/50 text-lime-400">
            <Code2 size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight">AGENT_DELTA</h2>
            <p className="text-xs text-lime-400 font-mono">CODE ARCHITECT</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
             {remix.tech_stack}
           </span>
        </div>
      </div>

      <div className="relative flex-1 bg-black rounded border border-slate-800 overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900 border-b border-slate-800 flex items-center px-3 justify-between z-10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
          </div>
          <button 
            onClick={handleCopy}
            className="text-slate-500 hover:text-white transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-500"/> : <Clipboard size={14} />}
          </button>
        </div>
        <div className="absolute inset-0 top-8 overflow-auto p-4 custom-scrollbar">
          <pre className="text-xs font-mono text-slate-300 leading-normal whitespace-pre-wrap break-all">
            <code>{remix.code_snippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AgentDelta;

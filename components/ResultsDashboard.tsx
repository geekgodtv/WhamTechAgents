import React from 'react';
import { NexusOutput } from '../types';
import AgentAlpha from './AgentAlpha';
import AgentBravo from './AgentBravo';
import AgentCharlie from './AgentCharlie';
import AgentDelta from './AgentDelta';
import { Database, Clock } from 'lucide-react';

interface ResultsDashboardProps {
  data: NexusOutput;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data }) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-4 mb-8">
        <div>
          <div className="text-xs font-bold text-cyan-500 font-mono mb-1">TARGET_ENTITY</div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">{data.client_info.name}</h1>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0 text-right">
          <div className="font-mono text-xs text-slate-500">
            <div className="flex items-center justify-end gap-1 mb-1"><Clock size={12}/> TIMESTAMP</div>
            <div className="text-slate-300">{new Date().toISOString()}</div>
          </div>
          <div className="font-mono text-xs text-slate-500">
            <div className="flex items-center justify-end gap-1 mb-1"><Database size={12}/> HASH</div>
            <div className="text-slate-300">0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">
        <div className="space-y-6">
          <AgentAlpha visuals={data.agent_alpha_visuals} />
          <AgentBravo strategy={data.agent_bravo_strategy} />
        </div>
        <div className="space-y-6">
          <AgentCharlie audit={data.agent_charlie_audit} />
          <div className="h-96">
             <AgentDelta remix={data.agent_delta_remix} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;

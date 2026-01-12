import React from 'react';
import { AgentBravoStrategy } from '../types';
import { TrendingUp, Target, Calendar } from 'lucide-react';

interface AgentBravoProps {
  strategy: AgentBravoStrategy;
}

const AgentBravo: React.FC<AgentBravoProps> = ({ strategy }) => {
  return (
    <div className="bg-slate-900/40 border border-cyan-500/30 rounded-lg p-6 h-full relative overflow-hidden">
       <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <TrendingUp size={120} />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/20 rounded border border-cyan-500/50 text-cyan-400">
          <Target size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight">AGENT_BRAVO</h2>
          <p className="text-xs text-cyan-400 font-mono">VIRAL STRATEGIST</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 font-mono">Strategic Pillars</h3>
        <div className="grid grid-cols-1 gap-2">
          {strategy.business_pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-cyan-950/20 p-2 rounded border border-cyan-900/50">
              <span className="text-cyan-500 font-mono font-bold text-lg opacity-50">0{idx + 1}</span>
              <span className="text-sm text-slate-200">{pillar}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 font-mono flex items-center gap-2">
          <Calendar size={12} /> 4-Week Tactical Map
        </h3>
        <div className="space-y-3 relative">
           <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-800"></div>
           {strategy.content_calendar.map((week, idx) => (
             <div key={idx} className="relative pl-8">
               <div className="absolute left-1.5 top-1.5 w-3 h-3 bg-cyan-900 border border-cyan-500 rounded-full z-10"></div>
               <div className="mb-1">
                 <span className="text-xs font-bold text-cyan-400 font-mono">WEEK {week.week}</span>
                 <span className="mx-2 text-slate-600">|</span>
                 <span className="text-xs text-slate-300 font-bold uppercase">{week.focus}</span>
               </div>
               <ul className="text-xs text-slate-400 space-y-1">
                 {week.content_ideas.map((idea, i) => (
                   <li key={i} className="flex items-start gap-1">
                     <span className="text-slate-600">•</span> {idea}
                   </li>
                 ))}
               </ul>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AgentBravo;

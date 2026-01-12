import React from 'react';
import { AgentCharlieAudit } from '../types';
import { ShieldAlert, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';

interface AgentCharlieProps {
  audit: AgentCharlieAudit;
}

const AgentCharlie: React.FC<AgentCharlieProps> = ({ audit }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500';
    if (score >= 50) return 'text-yellow-400 border-yellow-500';
    return 'text-red-500 border-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-slate-900/40 border border-red-500/30 rounded-lg p-6 h-full relative overflow-hidden">
       <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <ShieldAlert size={120} />
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/20 rounded border border-red-500/50 text-red-400">
          <Activity size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-100 font-mono tracking-tight">AGENT_CHARLIE</h2>
          <p className="text-xs text-red-400 font-mono">RUTHLESS AUDITOR</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-6">
        <div className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center ${getScoreColor(audit.audit_score)}`}>
           <div className="text-center">
             <span className="text-3xl font-black font-mono block leading-none">{audit.audit_score}</span>
             <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Score</span>
           </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 font-mono">Sentiment Analysis</h3>
          <p className="text-sm text-slate-300 italic">"{audit.sentiment_analysis}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
           <h3 className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-3 font-mono">
            <AlertTriangle size={14} /> Critical Fails
           </h3>
           <ul className="space-y-2">
             {audit.critical_issues.map((issue, idx) => (
               <li key={idx} className="bg-red-950/30 border border-red-900/50 rounded p-2 text-xs text-red-200">
                 {issue}
               </li>
             ))}
           </ul>
        </div>
        <div>
           <h3 className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3 font-mono">
            <CheckCircle2 size={14} /> Quick Wins
           </h3>
           <ul className="space-y-2">
             {audit.quick_wins.map((win, idx) => (
               <li key={idx} className="bg-emerald-950/30 border border-emerald-900/50 rounded p-2 text-xs text-emerald-200">
                 {win}
               </li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentCharlie;

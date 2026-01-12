import React, { useState } from 'react';
import TerminalInput from './components/TerminalInput';
import ResultsDashboard from './components/ResultsDashboard';
import { runOrchestration } from './services/gemini';
import { NexusOutput, AgentStatus, BusinessIntake } from './types';
import { Layers } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<AgentStatus>(AgentStatus.IDLE);
  const [data, setData] = useState<NexusOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputSubmit = async (intake: BusinessIntake) => {
    setStatus(AgentStatus.THINKING);
    setError(null);
    try {
      const result = await runOrchestration(intake);
      setData(result);
      setStatus(AgentStatus.COMPLETE);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during orchestration.");
      setStatus(AgentStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 p-6 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Grid */}
      <div 
        className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 mb-4">
             <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
             <span className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest">SYSTEM ONLINE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500 mb-2 flex items-center justify-center gap-4">
            <Layers className="text-cyan-500" size={48} />
            WHAMTECH AGENTS
          </h1>
          <p className="text-slate-500 font-mono text-sm max-w-lg mx-auto">
            MULTI-AGENT INTELLIGENCE SWARM V1.0
          </p>
        </header>

        {/* Input */}
        {status === AgentStatus.IDLE || status === AgentStatus.ERROR ? (
          <div className="w-full animate-fade-in">
             <TerminalInput onSubmit={handleInputSubmit} isLoading={false} />
             {error && (
               <div className="max-w-4xl mx-auto p-4 bg-red-950/20 border border-red-500/50 text-red-400 font-mono text-xs rounded">
                 ERROR: {error}
               </div>
             )}
          </div>
        ) : null}

        {/* Loading State */}
        {status === AgentStatus.THINKING && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <div className="text-cyan-400 font-mono text-lg font-bold">INITIALIZING AGENT SWARM...</div>
            <div className="text-slate-500 font-mono text-sm mt-2">Allocating neural resources...</div>
          </div>
        )}

        {/* Results */}
        {status === AgentStatus.COMPLETE && data && (
          <div className="w-full">
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => {
                  setStatus(AgentStatus.IDLE);
                  setData(null);
                }}
                className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors"
              >
                &larr; NEW_SESSION
              </button>
            </div>
            <ResultsDashboard data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
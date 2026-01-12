import React, { useState, useRef } from 'react';
import { Terminal, Send, Cpu, Upload, FileText, Globe, Users, Zap, Briefcase, Image as ImageIcon, X } from 'lucide-react';
import { BusinessIntake } from '../types';

interface TerminalInputProps {
  onSubmit: (data: BusinessIntake) => void;
  isLoading: boolean;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BusinessIntake>({
    businessName: '',
    industry: '',
    targetAudience: '',
    aesthetic: '',
    website: '',
    socialHandles: '',
    painPoints: '',
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof BusinessIntake, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        // Strip the data:image/xyz;base64, prefix for the API
        const base64Data = result.split(',')[1];
        setFormData(prev => ({
          ...prev,
          logoData: base64Data,
          logoMimeType: file.type
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    setLogoPreview(null);
    setFormData(prev => ({ ...prev, logoData: undefined, logoMimeType: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.businessName && !isLoading) {
      onSubmit(formData);
    }
  };

  const isFormValid = formData.businessName.trim() !== '' && formData.industry.trim() !== '';

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-black rounded-lg border border-slate-800 p-1">
        <div className="bg-slate-900/50 rounded-md p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-6 text-cyan-400 font-mono text-sm border-b border-slate-800 pb-2">
            <Terminal size={16} />
            <span>WHAMTECH_UPLINK // INTAKE_PROTOCOL_V2</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECTION 1: IDENTITY */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-mono uppercase tracking-widest">
                <Briefcase size={12} /> Identity Module
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group/input relative">
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-slate-950/50 border-b border-slate-700 text-slate-200 font-mono py-2 px-3 focus:outline-none focus:border-cyan-500 focus:bg-slate-900/80 transition-all text-sm"
                    disabled={isLoading}
                    required
                  />
                  <label className="absolute left-3 top-2 text-slate-600 text-xs font-mono transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-slate-500">
                    BUSINESS_NAME *
                  </label>
                </div>
                <div className="group/input relative">
                   <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-slate-950/50 border-b border-slate-700 text-slate-200 font-mono py-2 px-3 focus:outline-none focus:border-cyan-500 focus:bg-slate-900/80 transition-all text-sm"
                    disabled={isLoading}
                    required
                  />
                  <label className="absolute left-3 top-2 text-slate-600 text-xs font-mono transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-cyan-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-slate-500">
                    INDUSTRY (e.g. Music, SaaS) *
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 2: VIBE */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-mono uppercase tracking-widest">
                <Users size={12} /> Vibe Analysis
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="group/input relative">
                   <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => handleChange('targetAudience', e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-slate-950/50 border-b border-slate-700 text-slate-200 font-mono py-2 px-3 focus:outline-none focus:border-fuchsia-500 focus:bg-slate-900/80 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <label className="absolute left-3 top-2 text-slate-600 text-xs font-mono transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-fuchsia-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-slate-500">
                    TARGET_AUDIENCE
                  </label>
                </div>
                <div className="group/input relative">
                   <input
                    type="text"
                    value={formData.aesthetic}
                    onChange={(e) => handleChange('aesthetic', e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-slate-950/50 border-b border-slate-700 text-slate-200 font-mono py-2 px-3 focus:outline-none focus:border-fuchsia-500 focus:bg-slate-900/80 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <label className="absolute left-3 top-2 text-slate-600 text-xs font-mono transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-fuchsia-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-slate-500">
                    AESTHETIC (e.g. Cyberpunk, Minimal)
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 3: FOOTPRINT */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-mono uppercase tracking-widest">
                <Globe size={12} /> Digital Footprint
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="group/input relative">
                   <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-slate-950/50 border-b border-slate-700 text-slate-200 font-mono py-2 px-3 focus:outline-none focus:border-lime-500 focus:bg-slate-900/80 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <label className="absolute left-3 top-2 text-slate-600 text-xs font-mono transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-lime-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-slate-500">
                    WEBSITE_URL
                  </label>
                </div>
                <div className="group/input relative">
                   <input
                    type="text"
                    value={formData.socialHandles}
                    onChange={(e) => handleChange('socialHandles', e.target.value)}
                    placeholder=" "
                    className="peer w-full bg-slate-950/50 border-b border-slate-700 text-slate-200 font-mono py-2 px-3 focus:outline-none focus:border-lime-500 focus:bg-slate-900/80 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <label className="absolute left-3 top-2 text-slate-600 text-xs font-mono transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-lime-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-slate-500">
                    SOCIAL_HANDLES (@...)
                  </label>
                </div>
              </div>
            </div>

             {/* SECTION 4: PAIN & ASSETS */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-mono uppercase tracking-widest">
                    <Zap size={12} /> Pain Matrix
                  </div>
                  <div className="group/input relative">
                    <textarea
                      value={formData.painPoints}
                      onChange={(e) => handleChange('painPoints', e.target.value)}
                      placeholder=" "
                      className="peer w-full h-24 bg-slate-950/50 border-b border-slate-700 text-slate-200 font-mono py-2 px-3 focus:outline-none focus:border-red-500 focus:bg-slate-900/80 transition-all text-sm resize-none"
                      disabled={isLoading}
                    />
                    <label className="absolute left-3 top-2 text-slate-600 text-xs font-mono transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-slate-500">
                      BIGGEST_STRUGGLE
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 font-mono uppercase tracking-widest">
                    <ImageIcon size={12} /> Asset Ingest
                  </div>
                  <div className="relative h-24 bg-slate-950/50 border border-dashed border-slate-700 hover:border-slate-500 transition-colors rounded flex flex-col items-center justify-center cursor-pointer overflow-hidden" onClick={() => fileInputRef.current?.click()}>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={isLoading}
                    />
                    {logoPreview ? (
                      <>
                        <img src={logoPreview} alt="Logo Preview" className="absolute inset-0 w-full h-full object-contain opacity-50 p-2" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                           <span className="text-xs text-white font-mono bg-black/80 px-2 py-1 rounded">CHANGE_FILE</span>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); clearLogo(); }}
                          className="absolute top-1 right-1 p-1 bg-red-900/80 text-white rounded hover:bg-red-700 z-10"
                        >
                          <X size={10} />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <Upload size={20} className="mx-auto text-slate-600 mb-2" />
                        <span className="text-xs text-slate-500 font-mono">UPLOAD_LOGO [OPTIONAL]</span>
                      </div>
                    )}
                  </div>
                </div>
             </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <div className="flex gap-2 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Cpu size={12} /> SYSTEM_READY
                </span>
                <span className="text-slate-700">|</span>
                <span>V6.1.0</span>
              </div>
              
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded font-mono text-sm font-bold uppercase tracking-wider
                  transition-all duration-300
                  ${!isFormValid || isLoading 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]'}
                `}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">/</span> PROCESSING
                  </span>
                ) : (
                  <>
                    INITIALIZE_SWARM <Send size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerminalInput;
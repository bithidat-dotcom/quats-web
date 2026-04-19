import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Image as ImageIcon, Loader2, ExternalLink, Settings2, Maximize, Orbit, SlidersHorizontal } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AiGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Customization States
  const [ratio, setRatio] = useState('16:9');
  const [sizeMultiplier, setSizeMultiplier] = useState(1);
  const [quality, setQuality] = useState('standard');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Build the prompt modifiers based on user UI selections
      let finalPrompt = prompt;
      
      if (quality === 'hd') {
        finalPrompt += ", masterpiece, ultra-realistic, cinematic lighting, highly detailed, 8k resolution, professional photography";
      }
      if (sizeMultiplier > 1) {
        finalPrompt += ", sharp focus, high-resolution detail";
      } else if (sizeMultiplier < 1) {
        finalPrompt += ", simple composition, fast render";
      }

      // Initialize the Gemini AI client
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      // Call the Gemini Image Generation Model
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: finalPrompt }
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: ratio as any,
          },
        },
      });

      let foundImage = false;
      const parts = response.candidates?.[0]?.content?.parts || [];
      
      for (const part of parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          const imageUrl = `data:image/jpeg;base64,${base64EncodeString}`;
          setGeneratedImage(imageUrl);
          foundImage = true;
          break; // Use the first generated image
        }
      }

      if (!foundImage) {
        throw new Error("No image data was returned from the server.");
      }
      
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      setError(err.message || 'Failed to generate image. Please try again or check your prompt constraints.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Determine container aspect ratio dynamically
  const containerRatioCode = ratio.replace(':', '/');

  return (
    <main className="pt-32 pb-24 min-h-[85vh] flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 lowercase">
            quats.image
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto">
            Generate high-quality concepts, website layouts, app designs or creative assets instantly using our integrated AI image engine.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-[2rem] backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] mb-8"
        >
          <form onSubmit={handleGenerate} className="flex flex-col gap-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your layout, app design, or website..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all font-sans"
                  disabled={isGenerating}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className={`px-4 rounded-xl border transition-all flex items-center justify-center ${showSettings ? 'bg-white text-black border-white' : 'bg-black/50 border-white/10 text-white/70 hover:text-white hover:border-white/30'}`}
                >
                  <Settings2 size={24} />
                </button>
              </div>
              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Create Image
                  </>
                )}
              </button>
            </div>

            {/* Customization Settings Bar */}
            {showSettings && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-white/10 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Ratio Setting */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-[#888888] font-semibold flex items-center gap-1.5">
                      <Maximize size={14}/> Aspect Ratio
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: '16:9', label: '16:9' },
                        { val: '9:16', label: '9:16' },
                        { val: '1:1', label: '1:1' },
                        { val: '3:4', label: '3:4' },
                        { val: '4:3', label: '4:3' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          disabled={isGenerating}
                          onClick={() => setRatio(item.val)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                            ratio === item.val 
                              ? 'bg-white text-black border-white' 
                              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Scale Modifier */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-[#888888] font-semibold flex items-center gap-1.5">
                      <SlidersHorizontal size={14}/> Detail Level
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 0.75, label: 'Fast' },
                        { val: 1, label: 'Standard' },
                        { val: 1.5, label: 'Detail' },
                        { val: 2, label: 'Max' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          disabled={isGenerating}
                          onClick={() => setSizeMultiplier(item.val)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                            sizeMultiplier === item.val 
                              ? 'bg-green-500 text-black border-green-500' 
                              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quality Modifier */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-[#888888] font-semibold flex items-center gap-1.5">
                      <Orbit size={14}/> Generation Engine
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { val: 'standard', label: 'Standard' },
                        { val: 'hd', label: 'HD Enhancement' }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          disabled={isGenerating}
                          onClick={() => setQuality(item.val)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                            quality === item.val 
                              ? 'bg-blue-500 text-white border-blue-500' 
                              : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </form>

          {/* Image Display Area */}
          <div className="w-full flex items-center justify-center p-4 min-h-[400px] rounded-xl border border-white/10 bg-black/50 relative overflow-hidden">
            {isGenerating && !generatedImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 backdrop-blur-sm">
                <Loader2 size={40} className="text-white animate-spin mb-4" />
                <p className="text-white/70 font-mono text-sm animate-pulse tracking-widest uppercase">Rendering Data...</p>
              </div>
            )}

            {generatedImage ? (
              <div 
                className="group relative" 
                style={{ aspectRatio: containerRatioCode, maxHeight: '70vh', maxWidth: '100%' }}
              >
                <img 
                  src={generatedImage} 
                  alt="AI Generated Result" 
                  className="w-full h-full object-contain rounded border border-white/10 shadow-2xl"
                />
                
                {/* Download / View Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end gap-3 rounded-b">
                  <a 
                    href={generatedImage} 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-xl transition-colors border border-white/20"
                    title="Open Full Resolution"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ) : !isGenerating && (
              <div className="flex flex-col items-center justify-center text-[#555555]">
                <ImageIcon size={48} className="mb-4 opacity-50" />
                <p className="font-medium text-sm">Image output will appear here</p>
              </div>
            )}
          </div>
        </motion.div>
        
        {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center text-sm">
              {error}
            </div>
        )}
      </div>
    </main>
  );
}

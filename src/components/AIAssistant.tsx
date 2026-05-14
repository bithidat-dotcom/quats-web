import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  ChevronDown,
  Terminal,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

const SYSTEM_INSTRUCTION = `
You are the ADJECT SIMPLE ADVISOR. 
Your goal is to provide SHORT, SIMPLE, and DIRECT answers about the platform and CEO strategy.
Platform: Adject / QUATS.
CEO Knowledge: Scaling and efficiency.
Tone: Direct, simple, professional.
Limit every response to 1-2 short sentences maximum.
`;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'ASA status: ONLINE. I am your direct advisor. How can I help?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    if (userMessage.toLowerCase().includes('generate image') || userMessage.toLowerCase().includes('create image')) {
      const prompt = userMessage.replace(/(generate|create) image/gi, '').trim();
      setMessages(prev => [...prev, { role: 'assistant', content: `Generating image for "${prompt}"...`, image: `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` }]);
      setIsLoading(false);
      return;
    }

    try {
      const prompt = `${SYSTEM_INSTRUCTION}\n\nUser: ${userMessage}\nAssistant:`;
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
      
      if (!response.ok) throw new Error('Pollinations uplink failed');
      
      const assistantContent = await response.text();
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent.trim() }]);
    } catch (error) {
      console.error('Chat failed:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM ERROR: Simple uplink failed. Try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/20 flex items-center justify-center border border-white/10 group"
      >
        <div className="absolute inset-0 bg-blue-500 rounded-2xl animate-ping opacity-20 pointer-events-none" />
        <MessageSquare size={20} className="group-hover:rotate-12 transition-transform md:w-6 md:h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-[70] w-[calc(100vw-32px)] md:w-[400px] h-[75vh] md:h-[550px] bg-white border border-zinc-200 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-white border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                  <Bot size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-sm text-zinc-900">Quats</h3>
                  <p className="text-[10px] text-zinc-500">Powered by Pollinations.ai</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${
                      msg.role === 'user' 
                        ? 'bg-zinc-100 border-zinc-200' 
                        : 'bg-blue-50 border-blue-100'
                    }`}>
                      {msg.role === 'user' ? <User size={14} className="text-zinc-600" /> : <Bot size={14} className="text-blue-600" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-zinc-100 text-zinc-800 rounded-bl-none'
                    }`}>
                      {msg.content}
                      {msg.image && (
                        <div className="mt-2">
                          <img src={msg.image} alt="Generated" className="rounded-lg mb-2" />
                          <a 
                            href={msg.image} 
                            download 
                            className="text-[10px] font-bold text-blue-600 underline"
                          >
                            Download Image
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                      <Loader2 size={14} className="text-blue-400 animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5">
                      <span className="text-[8px] font-game text-blue-500 animate-pulse tracking-widest">Processing Tactical Logic...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-zinc-200">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 p-1.5 bg-zinc-50 border border-zinc-200 rounded-2xl"
              >
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Quats..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

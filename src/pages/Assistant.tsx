import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, User, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am the Quats Intelligence Assistant. What can I create, code, or answer for you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  };

  // Scroll downwards when messages change, or loading state toggles
  useEffect(() => {
    // Add a tiny delay to ensure DOM has painted the latest messages
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Call our internal secure backend which holds the hidden API key
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct:free", // Using a consistent free model string
          messages: [
            { role: "system", content: "You are the Quats Intelligence Assistant, an advanced AI software engineer and creative consultant. You help users build platforms, code arrays, generate ideas, and solve deeply technical questions gracefully." },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Assistant Backend Error:", errorData);
        throw new Error(errorData.error || "Failed to communicate with the neural network.");
      }

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content || "I couldn't process that. Could you try again?";

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: "Network anomaly detected. Please try messaging again or check your OpenRouter bounds." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Background glow specific to assistant page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl w-full flex-1 flex flex-col relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="text-[11px] uppercase tracking-[3px] text-blue-400 mb-4 font-semibold flex items-center justify-center gap-2">
            <Sparkles size={14} className="animate-pulse" /> Advanced Neural Network
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 lowercase">
            quats.assistant
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto">
            Your personal engineering counterpart. Ask questions, construct layouts, and accelerate architecture securely.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 flex flex-col bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)]"
          style={{ height: '600px', maxHeight: '70vh' }}
        >
          {/* Chat Window */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          >
            {messages.map((message, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={i} 
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-10 h-10 shrink-0 rounded-full flex flex-col items-center justify-center border ${message.role === 'user' ? 'bg-white/10 border-white/20 text-white' : 'bg-blue-500/20 border-blue-500/30 text-blue-400'}`}>
                  {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`flex flex-col max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] uppercase tracking-widest text-[#888888] mb-1 font-semibold">
                    {message.role === 'user' ? 'You' : 'System'}
                  </span>
                  <div className={`px-5 py-3 rounded-2xl whitespace-pre-wrap font-sans text-[15px] leading-relaxed shadow-lg ${message.role === 'user' ? 'bg-white text-black rounded-tr-sm' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-sm'}`}>
                    {message.content}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div className="flex flex-col items-start max-w-[80%]">
                  <span className="text-[10px] uppercase tracking-widest text-[#888888] mb-1 font-semibold">System</span>
                  <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-sm flex items-center gap-3 text-white/50">
                    <Loader2 size={16} className="animate-spin" /> Processing request...
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-black/40 border-t border-white/5">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the neural network anything..."
                disabled={isLoading}
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-white/30 rounded-2xl pl-6 pr-16 py-4 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-sans"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white text-black rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Send size={18} className="translate-y-[1px] -translate-x-[1px] group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform" />
              </button>
            </form>
            <div className="text-center mt-3 text-[11px] text-white/30 font-medium">
              Powered by OpenRouter AI Framework
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

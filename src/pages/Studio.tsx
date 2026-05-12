import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Send, 
  Code, 
  Eye, 
  PenTool, 
  Layers, 
  Download, 
  Settings, 
  X, 
  Loader2, 
  ChevronRight,
  FileCode,
  Image as ImageIcon,
  FolderPlus,
  RefreshCcw,
  AlertTriangle,
  CheckCircle2,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Type,
  Bold,
  Italic,
  Maximize2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface FileEntry {
  name: string;
  content: string;
  language: string;
}

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
  files?: FileEntry[];
}

export default function Studio() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFile, setActiveFile] = useState<FileEntry | null>(null);
  const [files, setFiles] = useState<FileEntry[]>([
    { name: 'index.html', content: '<!-- Your AI created website will appear here -->\n<div class="h-screen flex items-center justify-center bg-zinc-950 text-white font-sans">\n  <div class="text-center space-y-4">\n    <h1 class="text-4xl font-bold">Studio Ready</h1>\n    <p class="text-zinc-500">Write a prompt to begin building.</p>\n  </div>\n</div>', language: 'html' }
  ]);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [isPreviewError, setIsPreviewError] = useState(false);
  const [isPenToolActive, setIsPenToolActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [editingText, setEditingText] = useState('');
  const [editingStyles, setEditingStyles] = useState<{
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
  }>({});
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  useEffect(() => {
    if (files.length > 0 && !activeFile) {
      setActiveFile(files[0]);
    }
  }, [files, activeFile]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!prompt.trim() && !selectedImage) || isLoading) return;

    const userPrompt = prompt;
    const imageToUse = selectedImage;
    setPrompt('');
    setSelectedImage(null);
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userPrompt || 'Process this image' }]);

    try {
      const contents: any[] = [
        {
          role: "user",
          parts: [
            { text: `You are an expert full-stack developer. Build a website or component based on this prompt: "${userPrompt}". 
            Output ONLY the raw content of the files. Format your response as a JSON array of objects with 'name', 'content', and 'language' keys. 
            Example: [{"name": "index.html", "content": "...", "language": "html"}]
            Make it modern, responsive, and high-quality. Use Tailwind CSS via CDN if helpful. 
            Current files context: ${JSON.stringify(files.map(f => ({ name: f.name, content: f.content.substring(0, 100) + '...' })))}` }
          ]
        }
      ];

      if (imageToUse) {
        contents[0].parts.push({
          inlineData: {
            mimeType: imageToUse.split(';')[0].split(':')[1],
            data: imageToUse.split(',')[1]
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents,
        config: {
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text;
      const newFiles: FileEntry[] = JSON.parse(responseText);

      if (Array.isArray(newFiles) && newFiles.length > 0) {
        setFiles(prev => {
          const updated = [...prev];
          newFiles.forEach(nf => {
            const index = updated.findIndex(f => f.name === nf.name);
            if (index !== -1) {
              updated[index] = nf;
            } else {
              updated.push(nf);
            }
          });
          return updated;
        });
        
        const mainFile = newFiles.find(f => f.name === 'index.html') || newFiles[0];
        setActiveFile(mainFile);
        setMessages(prev => [...prev, { role: 'ai', text: 'Intelligence deployed. Files synchronized.', files: newFiles }]);
        setIsPreviewError(false);
      }
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: 'Neural process interrupted. Attempting to recover...' }]);
      setIsPreviewError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFix = () => {
    setPrompt(`Fix the errors in the current code and ensure it renders correctly: ${activeFile?.content.substring(0, 500)}`);
    handleGenerate();
  };

  const getCombinedCode = () => {
    const htmlFile = files.find(f => f.name === 'index.html');
    if (!htmlFile) return '';

    let content = htmlFile.content;

    // Inject Tailwind if not present
    if (!content.includes('tailwindcss')) {
      content = content.replace('</head>', '<script src="https://cdn.tailwindcss.com"></script></head>');
    }

    // Inject Pen Tool Script
    content = content.replace('</body>', `
      <script>
        window.addEventListener('click', (e) => {
          e.preventDefault();
          window.parent.postMessage({
            type: 'element-selected',
            tagName: e.target.tagName,
            innerText: e.target.innerText,
            id: e.target.id,
            className: e.target.className,
            styles: {
              color: window.getComputedStyle(e.target).color,
              fontSize: window.getComputedStyle(e.target).fontSize,
              backgroundColor: window.getComputedStyle(e.target).backgroundColor,
            }
          }, '*');
        });
      </script>
    </body>`);

    return content;
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'element-selected') {
        setSelectedElement(event.data);
        setEditingText(event.data.innerText || '');
        setEditingStyles({
          fontSize: event.data.styles?.fontSize,
          fontWeight: event.data.styles?.fontWeight || 'normal',
          textAlign: event.data.styles?.textAlign || 'left',
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleExport = () => {
    const combined = getCombinedCode();
    const blob = new Blob([combined], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quats-site.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddFile = () => {
    const fileName = prompt('Enter file name:');
    if (fileName) {
      const newFile = { name: fileName, content: '', language: fileName.split('.').pop() || 'text' };
      setFiles(prev => [...prev, newFile]);
      setActiveFile(newFile);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-black mt-[80px]">
      <style>{`
        .studio-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .studio-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .studio-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .studio-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
      {/* Studio Header / Toolbar */}
      <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between bg-zinc-950/50 backdrop-blur-md relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 rounded-lg">
            <Layers size={14} className="text-blue-400" />
            <span className="text-[10px] font-game uppercase tracking-widest text-blue-100">QUATS STUDIO V1.0</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className="flex bg-zinc-900 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded-md flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              <Eye size={14} />
              <span className="text-[10px] font-bold uppercase">Preview</span>
            </button>
            <button 
              onClick={() => setViewMode('code')}
              className={`px-3 py-1 rounded-md flex items-center gap-2 transition-all ${viewMode === 'code' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
            >
              <Code size={14} />
              <span className="text-[10px] font-bold uppercase">Code</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPenToolActive(!isPenToolActive)}
            className={`p-2 rounded-lg transition-all ${isPenToolActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
            title="Pen Tool - Visual Editor"
          >
            <PenTool size={18} />
          </button>
          <button className="p-2 bg-white/5 text-zinc-400 hover:text-white rounded-lg transition-all">
            <Settings size={18} />
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl font-game text-[10px] uppercase font-black hover:bg-zinc-200 transition-all active:scale-95"
          >
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Files & Chat */}
        <div className="w-80 border-r border-white/10 bg-zinc-950 flex flex-col relative z-10 shrink-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-6 studio-scroll">
            {/* Folder Structure */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-game uppercase tracking-widest text-zinc-500">Workspace</span>
                <div className="flex gap-2">
                  <button 
                    onClick={handleAddFile}
                    className="p-1 hover:bg-white/5 rounded text-zinc-500 hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                  <button className="p-1 hover:bg-white/5 rounded text-zinc-500 hover:text-white transition-colors">
                    <FolderPlus size={14} />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                {files.map(file => (
                  <button 
                    key={file.name}
                    onClick={() => setActiveFile(file)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg group transition-all ${activeFile?.name === file.name ? 'bg-white/5 text-white' : 'text-zinc-500 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-2">
                      <FileCode size={14} className={activeFile?.name === file.name ? "text-blue-400" : "text-zinc-600"} />
                      <span className="text-[11px] font-medium truncate">{file.name}</span>
                    </div>
                    {activeFile?.name === file.name && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Context / Messages */}
            <div className="space-y-4">
              <span className="text-[10px] font-game uppercase tracking-widest text-zinc-500">Agent Feed</span>
              {messages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-xl text-[11px] leading-relaxed ${msg.role === 'user' ? 'bg-zinc-900 text-zinc-300' : 'bg-blue-600/10 border border-blue-500/20 text-blue-100'}`}>
                   {msg.text}
                </div>
              ))}
            </div>
          </div>

          {/* Prompt Bar Fixed at Bottom of Sidebar */}
          <div className="p-4 bg-zinc-950 border-t border-white/10">
            <form onSubmit={handleGenerate} className="relative">
              {isPreviewError && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleFix}
                  className="absolute -top-12 left-0 right-0 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg flex items-center justify-center gap-2 font-game text-[9px] uppercase tracking-widest hover:bg-red-600/30 transition-all"
                >
                  <AlertTriangle size={12} /> Sync Error Detected - Fix
                </motion.button>
              )}
              
              <div className="bg-zinc-900 border border-white/5 rounded-2xl p-2 focus-within:border-white/20 transition-all">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your website..."
                  className="w-full bg-transparent border-none outline-none px-3 py-2 text-[12px] h-24 resize-none placeholder:text-zinc-600"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                />
                <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
                  <div className="flex gap-2 items-center">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-all hover:text-blue-400" 
                      title="Add Image"
                    >
                      <ImageIcon size={16} />
                    </button>
                    <button type="button" className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 transition-all" title="Add File">
                      <Plus size={16} />
                    </button>
                    {selectedImage && (
                      <div className="relative group/img">
                        <img src={selectedImage} className="w-8 h-8 rounded border border-white/10 object-cover" />
                        <button 
                          onClick={() => setSelectedImage(null)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover/img:opacity-100 transition-all"
                        >
                          <X size={8} />
                        </button>
                      </div>
                    )}
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading || (!prompt.trim() && !selectedImage)}
                    className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  >
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-black overflow-hidden relative">
          <AnimatePresence mode="wait">
            {viewMode === 'preview' ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full p-4 md:p-8"
              >
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl relative">
                   <iframe 
                    ref={iframeRef}
                    srcDoc={getCombinedCode()} 
                    className="w-full h-full border-none"
                    title="Website Preview"
                  />
                  
                  {isPenToolActive && selectedElement && (
                    <motion.div 
                      key="pen-tool-ui"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-4 right-4 w-72 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                        <span className="text-[10px] font-game uppercase tracking-widest text-blue-400 flex items-center gap-2">
                          <Edit3 size={12} /> Element Designer
                        </span>
                        <button onClick={() => setSelectedElement(null)} className="text-zinc-500 hover:text-white transition-colors"><X size={14} /></button>
                      </div>

                      <div className="space-y-5 studio-scroll max-h-[70vh] overflow-y-auto pr-2">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                          <span className="text-[8px] text-zinc-500 block mb-1 uppercase tracking-widest">Target Selection</span>
                          <div className="flex items-center gap-2">
                            <code className="text-xs text-blue-300 font-mono">[{selectedElement.tagName.toLowerCase()}]</code>
                            {selectedElement.id && <code className="text-[10px] text-zinc-500 font-mono">#{selectedElement.id}</code>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[8px] uppercase tracking-widest text-zinc-500">Content</label>
                            <Type size={10} className="text-zinc-600" />
                          </div>
                          <textarea 
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500/50 min-h-[60px] resize-none font-sans text-zinc-200"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[8px] uppercase tracking-widest text-zinc-500">Typography</label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <span className="text-[7px] text-zinc-600 uppercase">Size</span>
                              <div className="flex items-center gap-2 bg-zinc-900 p-2 rounded-lg border border-white/5">
                                <span className="text-[10px] text-zinc-300 font-mono uppercase">{selectedElement.styles.fontSize}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <span className="text-[7px] text-zinc-600 uppercase">Weight</span>
                              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-white/5">
                                <button 
                                  onClick={() => setEditingStyles(p => ({ ...p, fontWeight: 'bold' }))}
                                  className={`flex-1 flex justify-center py-1 rounded transition-colors ${editingStyles.fontWeight === 'bold' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-zinc-500'}`}
                                >
                                  <Bold size={10} />
                                </button>
                                <button 
                                  onClick={() => setEditingStyles(p => ({ ...p, fontWeight: 'italic' }))}
                                  className={`flex-1 flex justify-center py-1 rounded transition-colors ${editingStyles.fontWeight === 'italic' ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-zinc-500'}`}
                                >
                                  <Italic size={10} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[8px] uppercase tracking-widest text-zinc-500">Alignment</label>
                          <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-white/5">
                            {[
                              { id: 'left', icon: <AlignLeft size={12} /> },
                              { id: 'center', icon: <AlignCenter size={12} /> },
                              { id: 'right', icon: <AlignRight size={12} /> }
                            ].map(btn => (
                              <button 
                                key={btn.id}
                                onClick={() => setEditingStyles(p => ({ ...p, textAlign: btn.id }))}
                                className={`flex-1 flex justify-center py-2 rounded transition-colors ${editingStyles.textAlign === btn.id ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-zinc-500'}`}
                              >
                                {btn.icon}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label className="text-[8px] uppercase tracking-widest text-zinc-500">Color Palette</label>
                          <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-xl border border-white/5">
                            <div className="w-8 h-8 rounded-lg shadow-inner ring-1 ring-white/10" style={{ backgroundColor: selectedElement.styles.color }} />
                            <div className="flex-1">
                              <span className="text-[9px] text-zinc-300 font-mono block">Color: {selectedElement.styles.color}</span>
                              <span className="text-[9px] text-zinc-500 font-mono block">BG: {selectedElement.styles.backgroundColor}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            const styleInstructions = `
                              Text: "${editingText}",
                              Alignment: "${editingStyles.textAlign}",
                              Weight: "${editingStyles.fontWeight}",
                              FontSize: "${editingStyles.fontSize}"
                            `;
                            setPrompt(`Modify the selected ${selectedElement.tagName} element (ID: ${selectedElement.id || 'none'}, Class: ${selectedElement.className || 'none'}). Apply these specific updates: ${styleInstructions}. Ensure the changes are reflected perfectly in the code. Current file content: ${activeFile?.content.substring(0, 1500)}`);
                            handleGenerate();
                            setSelectedElement(null);
                          }}
                          className="w-full py-4 bg-blue-600 text-white rounded-xl text-[10px] font-game uppercase tracking-[2px] hover:bg-blue-500 transition-all font-black shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group"
                        >
                          Synchronize Design <RefreshCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full p-4 overflow-hidden"
              >
                <div className="w-full h-full bg-zinc-950/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                  <div className="flex items-center justify-between px-6 h-12 border-b border-white/5 bg-zinc-950">
                    <div className="flex items-center gap-3">
                      <FileCode size={16} className="text-blue-400" />
                      <span className="text-xs font-mono text-zinc-300">{activeFile?.name}</span>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-1.5 hover:bg-white/5 rounded text-zinc-500 hover:text-white" title="Copy"><RefreshCcw size={14} /></button>
                       <button className="p-1.5 hover:bg-white/5 rounded text-zinc-500 hover:text-white" title="Sync"><CheckCircle2 size={14} /></button>
                    </div>
                  </div>
                  <textarea 
                    value={activeFile?.content}
                    onChange={(e) => setActiveFile(prev => prev ? { ...prev, content: e.target.value } : null)}
                    className="flex-1 w-full bg-transparent border-none outline-none p-8 font-mono text-xs text-zinc-400 leading-relaxed resize-none studio-scroll"
                    spellCheck={false}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Generation Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <motion.div 
                  className="w-32 h-32 rounded-full bg-blue-600/20 blur-3xl absolute inset-0"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-t-2 border-r-2 border-blue-500 rounded-full flex items-center justify-center"
                >
                  <img 
                    src="https://i.ibb.co.com/7tPVv5mb/Dmitri-dmiiiitri-on-X-1.jpg" 
                    className="w-16 h-16 rounded-full object-cover shadow-[0_0_30px_rgba(37,99,235,0.4)]"
                  />
                </motion.div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-game font-black tracking-tighter uppercase text-white">Synthesizing World</h3>
                <div className="flex items-center gap-1 justify-center">
                  {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </div>
  );
}

// Missing Icons
const Edit3 = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);

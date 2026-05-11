import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Copy, Download, Code2, Check, ExternalLink, Terminal, Github, Loader2 } from 'lucide-react';

interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
  isExternal?: boolean;
  externalUrl?: string;
  stars?: number;
}

const INTERNAL_SNIPPETS: CodeSnippet[] = [
  {
    id: '1',
    title: 'Authentication Middleware',
    description: 'Robust JWT-based authentication middleware for Express.js applications.',
    language: 'typescript',
    category: 'Backend',
    code: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`
  },
  {
    id: '2',
    title: 'Responsive Navbar Component',
    description: 'A clean, responsive navigation bar built with React and Tailwind CSS.',
    language: 'tsx',
    category: 'UI/UX',
    code: `import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-950 border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="font-bold text-white uppercase tracking-tighter">QUATS</div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};`
  },
  {
    id: '3',
    title: 'API Rate Limiter',
    description: 'Simple rate limiting logic using Redis for high-scale applications.',
    language: 'javascript',
    category: 'Architecture',
    code: `const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');

const limiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:',
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

module.exports = limiter;`
  },
  {
    id: '4',
    title: 'Smart Dustbin (Arduino)',
    description: 'Automated lid control system using ultrasonic proximity sensing for touchless waste management.',
    language: 'cpp',
    category: 'Hardware',
    code: `#include <Servo.h>

Servo servo;
const int trigPin = 9;
const int echoPin = 10;
long duration;
int distance;

void setup() {
  servo.attach(11);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  servo.write(0); // Lid closed
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  
  if (distance < 20) {
    servo.write(90); // Open
    delay(3000);
  } else {
    servo.write(0); // Close
  }
}`
  },
  {
    id: '5',
    title: 'Precision Calculator Engine',
    description: 'A robust mathematical parser for handling complex arithmetic operations with precedence.',
    language: 'typescript',
    category: 'Utility',
    code: `export class MathEngine {
  static evaluate(expression: string): number {
    // Basic sanitization and evaluation
    try {
      const sanitized = expression.replace(/[^0-9+\\-*/(). ]/g, '');
      return new Function('return ' + sanitized)();
    } catch (e) {
      throw new Error('Invalid calculation');
    }
  }

  static formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
}`
  },
  {
    id: '6',
    title: 'Ultrasonic Radar System',
    description: '360° environment mapping logic using sweep-scan sonar technology.',
    language: 'cpp',
    category: 'Hardware',
    code: `void scanRadar() {
  for(int i=15; i<=165; i++){  
    myServo.write(i);
    delay(30);
    distance = calculateDistance();
    
    Serial.print(i); 
    Serial.print(","); 
    Serial.print(distance); 
    Serial.print("."); 
  }
  for(int i=165; i>15; i--){  
    myServo.write(i);
    delay(30);
    distance = calculateDistance();
    Serial.print(i);
    Serial.print(",");
    Serial.print(distance);
    Serial.print(".");
  }
}`
  },
  {
    id: '7',
    title: 'Secure File Encryptor (Python)',
    description: 'AES-256 encryption module for securing sensitive local files and data streams.',
    language: 'python',
    category: 'Security',
    code: `from cryptography.fernet import Fernet
import os

class QuatsVault:
    def __init__(self, key=None):
        self.key = key or Fernet.generate_key()
        self.cipher = Fernet(self.key)

    def encrypt_file(self, file_path):
        with open(file_path, 'rb') as f:
            data = f.read()
        encrypted = self.cipher.encrypt(data)
        with open(file_path + '.quats', 'wb') as f:
            f.write(encrypted)

    def decrypt_file(self, encrypted_path):
        with open(encrypted_path, 'rb') as f:
            data = f.read()
        decrypted = self.cipher.decrypt(data)
        return decrypted`
  },
  {
    id: '8',
    title: 'Async Web Engine',
    description: 'High-performance asynchronous data fetcher for Python-based web intelligence.',
    language: 'python',
    category: 'Backend',
    code: `import asyncio
import aiohttp

async def fetch_intelligence(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.json()
            return {"error": "Access Denied"}

async def main():
    endpoints = ["https://api.quats.com/v1", "https://node.quats.ai"]
    results = await asyncio.gather(*[fetch_intelligence(u) for u in endpoints])
    print(f"Captured {len(results)} intelligence points")

if __name__ == "__main__":
    asyncio.run(main())`
  }
];

export default function CodeStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [githubSnippets, setGithubSnippets] = useState<CodeSnippet[]>([]);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [isGithubMode, setIsGithubMode] = useState(true);

  const performGithubSearch = useCallback(async (query: string) => {
    if (!query) {
      setGithubSnippets([]);
      return;
    }

    setIsLoadingGithub(true);
    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=6`);
      const data = await response.json();
      
      if (data.items) {
        const transformed: CodeSnippet[] = data.items.map((item: any) => ({
          id: `github-${item.id}`,
          title: item.name,
          description: item.description || 'No description available.',
          language: item.language || 'Unknown',
          category: 'GitHub Repo',
          code: `git clone ${item.clone_url}`,
          isExternal: true,
          externalUrl: item.html_url,
          stars: item.stargazers_count
        }));
        setGithubSnippets(transformed);
      }
    } catch (error) {
      console.error('GitHub Search Error:', error);
    } finally {
      setIsLoadingGithub(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isGithubMode && searchQuery) {
        performGithubSearch(searchQuery);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, isGithubMode, performGithubSearch]);

  const internalFiltered = INTERNAL_SNIPPETS.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedSnippets = isGithubMode ? [...internalFiltered, ...githubSnippets] : internalFiltered;

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Code2 size={14} className="text-blue-400" />
            <span className="text-[10px] font-game uppercase tracking-[2px] text-blue-400">Quats Open Repository</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 font-game"
          >
            The Code <span className="text-zinc-600">Vault</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto uppercase text-xs tracking-widest leading-loose"
          >
            Access our internal patterns & global open-source intelligence. Integrated with GitHub live search.
          </motion.p>
        </div>

        {/* Search Engine */}
        <div className="max-w-2xl mx-auto mb-20 relative group">
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl group-focus-within:bg-blue-500/40 transition-all rounded-full" />
          <div className="relative flex items-center bg-zinc-900 border border-white/10 rounded-2xl p-2 h-16 shadow-2xl overflow-hidden">
            <Search className="ml-4 text-zinc-500" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH ALL CODE + GITHUB..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-4 font-game text-sm uppercase tracking-wider placeholder:text-zinc-700"
            />
            <button 
              onClick={() => performGithubSearch(searchQuery)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-game text-[10px] tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2"
            >
              {isLoadingGithub ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />} SEARCH
            </button>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-zinc-600 font-game text-[8px] uppercase tracking-widest">
            <button 
              onClick={() => setIsGithubMode(!isGithubMode)}
              className={`flex items-center gap-1.5 transition-colors ${isGithubMode ? 'text-blue-400' : 'hover:text-white'}`}
            >
              <Github size={10} /> GitHub Integration: {isGithubMode ? 'ON' : 'OFF'}
            </button>
            <span>•</span>
            <span>Popular: Python</span>
            <span>•</span>
            <span>Arduino</span>
            <span>•</span>
            <span>Security</span>
          </div>
        </div>

        {/* Snippets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {displayedSnippets.map((snippet) => (
              <motion.div
                key={snippet.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-zinc-900/50 border rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all group backdrop-blur-sm ${snippet.isExternal ? 'border-purple-500/10' : 'border-white/5'}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                        {snippet.isExternal ? (
                          <Github size={18} className="text-purple-400" />
                        ) : (
                          <Terminal size={18} className="text-zinc-400 group-hover:text-blue-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-game text-xs text-white group-hover:text-blue-400 transition-colors uppercase">{snippet.title}</h3>
                          {snippet.isExternal && (
                            <span className="bg-purple-500/20 text-purple-400 text-[6px] px-1.5 py-0.5 rounded uppercase font-game">Global</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[8px] text-zinc-600 font-game uppercase tracking-widest">{snippet.category}</span>
                          {snippet.stars !== undefined && (
                            <span className="text-[8px] text-yellow-500/60 font-game">★ {snippet.stars.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {snippet.externalUrl && (
                        <a 
                          href={snippet.externalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-zinc-500 hover:text-white"
                          title="Open on GitHub"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                      <button 
                        onClick={() => copyToClipboard(snippet.code, snippet.id)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/btn"
                        title="Copy Code"
                      >
                        {copiedId === snippet.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-zinc-500 group-hover/btn:text-white" />}
                      </button>
                      <button 
                        onClick={() => downloadCode(snippet.code, `${snippet.title.toLowerCase().replace(/\s+/g, '-')}.${snippet.language === 'typescript' ? 'ts' : snippet.language === 'tsx' ? 'tsx' : snippet.language === 'python' ? 'py' : 'txt'}`)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group/btn"
                        title="Download"
                      >
                        <Download size={14} className="text-zinc-500 group-hover/btn:text-white" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[#888888] text-[10px] font-game uppercase tracking-tight leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
                    {snippet.description}
                  </p>
                  
                  {/* Code Holder */}
                  <div className="relative">
                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-zinc-700 select-none uppercase">
                      {snippet.language}
                    </div>
                    <pre className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-blue-300 overflow-x-auto max-h-[200px] scrollbar-thin scrollbar-thumb-zinc-800">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {displayedSnippets.length === 0 && !isLoadingGithub && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-game text-zinc-600 text-sm tracking-widest">NO DATA FOUND FOR YOUR QUERY.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

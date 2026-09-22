import React, { useState, useRef, useEffect } from 'react';
import { USER_INFO, SKILL_CATEGORIES } from '../data';
import { useProjects } from '../context/ProjectsContext';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Copy, Check } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const { projects } = useProjects();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'cat welcome.txt',
      output: (
        <div className="text-zinc-300 space-y-1">
          <p className="text-cyan-400 font-bold">WakeUp CLI v1.0.4 (x86_64-linux-gnu)</p>
          <p>Добро пожаловать в интерактивную консоль разработчика. Введите <span className="text-emerald-400 font-semibold">help</span> для списка доступных команд.</p>
        </div>
      )
    }
  ]);

  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs sm:text-sm text-zinc-300 font-mono">
            <p className="text-zinc-400 mb-2">Доступные команды:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              <div><span className="text-cyan-400 font-semibold">skills</span> - полный технологический стек</div>
              <div><span className="text-cyan-400 font-semibold">projects</span> - список ключевых репозиториев</div>
              <div><span className="text-cyan-400 font-semibold">spider</span> - архитектура распределенного краулера</div>
              <div><span className="text-cyan-400 font-semibold">cat bio.json</span> - досье разработчика</div>
              <div><span className="text-cyan-400 font-semibold">contact</span> - способы связаться напрямую</div>
              <div><span className="text-cyan-400 font-semibold">clear</span> - очистить экран терминала</div>
            </div>
          </div>
        );
        break;

      case 'skills':
      case 'stack':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-zinc-300">
            <p className="text-emerald-400 font-semibold">[CORE TECH MATRIX]</p>
            <div className="space-y-1.5 pl-2 border-l-2 border-cyan-500/30">
              <p><span className="text-white font-bold">Languages:</span> Go (Golang), Python, C++, TypeScript, SQL</p>
              <p><span className="text-white font-bold">Backend:</span> Gin, gRPC, Protobuf, FastAPI, Django</p>
              <p><span className="text-white font-bold">Distributed/DB:</span> Redis (Queues/PubSub), PostgreSQL, MySQL, Docker</p>
              <p><span className="text-white font-bold">Dev Setup:</span> Linux, Neovim, Git, Nginx, Bash</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-zinc-300">
            <p className="text-cyan-400 font-semibold">[GITHUB REPOSITORIES: ascoler]</p>
            <div className="space-y-2 pl-2 border-l-2 border-emerald-500/30">
              {projects.map((p) => (
                <div key={p.id} className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{p.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-cyan-300 border border-white/10">
                      {p.language}
                    </span>
                    {p.stars > 0 && <span className="text-amber-400 text-xs">★ {p.stars}</span>}
                  </div>
                  <span className="text-zinc-400 text-xs">{p.tagline}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'spider':
      case 'spider-go':
        output = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-zinc-300 bg-zinc-900/60 p-3 rounded-lg border border-cyan-500/20">
            <p className="text-cyan-400 font-bold">spider-go: Distributed Web Crawler Architecture</p>
            <pre className="text-[11px] sm:text-xs text-zinc-300 overflow-x-auto leading-tight py-1 font-mono">
{`+-------------------+      gRPC       +-------------------+
|  Crawler Service  | --------------> |   Queue Service   |
| (HTML parse/links)|                 |  (Redis URL Mgmt) |
+-------------------+                 +-------------------+
          |                                     |
          v                                     v
+-------------------+                 +-------------------+
|  Storage Service  |                 |  Worker Pool (N)  |
|  (MySQL Database) |                 | (Concurrent Fetch)|
+-------------------+                 +-------------------+`}
            </pre>
            <p className="text-zinc-400 text-xs">Паттерн: Producer-Consumer с межсервисным gRPC и очередями Redis.</p>
          </div>
        );
        break;

      case 'cat bio.json':
      case 'bio':
        output = (
          <pre className="text-xs font-mono text-zinc-300 bg-zinc-900/80 p-3 rounded-lg border border-white/5 overflow-x-auto">
{JSON.stringify(
  {
    name: USER_INFO.name,
    alias: USER_INFO.handle,
    age: USER_INFO.age,
    location: USER_INFO.location,
    role: USER_INFO.role,
    specialization: ["Distributed Systems", "Go Microservices", "Python Automation"],
    leetcode: USER_INFO.socials.leetcode,
    quote: USER_INFO.quote
  },
  null,
  2
)}
          </pre>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm font-mono text-zinc-300">
            <p className="text-emerald-400 font-semibold">[CONTACT CHANNELS]</p>
            <p>Telegram: <a href={USER_INFO.socials.telegram} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{USER_INFO.socials.telegramHandle}</a></p>
            <p>Email: <a href={`mailto:${USER_INFO.socials.email}`} className="text-cyan-400 underline">{USER_INFO.socials.email}</a></p>
            <p>GitHub: <a href={USER_INFO.socials.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{USER_INFO.socials.github}</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        output = <p className="text-red-400 font-mono text-xs">wake_up is not in the sudoers file. This incident will be reported to the coffee machine.</p>;
        break;

      default:
        output = (
          <p className="text-zinc-400 font-mono text-xs">
            Команда не найдена: <span className="text-red-400 font-semibold">{cmd}</span>. Введите{' '}
            <button
              type="button"
              onClick={() => handleCommand('help')}
              className="text-cyan-400 underline hover:text-cyan-300 font-semibold cursor-pointer"
            >
              help
            </button>
            .
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const quickCommands = ['skills', 'spider', 'projects', 'cat bio.json', 'contact'];

  return (
    <section id="terminal" className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Interactive CLI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Терминал разработчика
            </h2>
          </div>

          {/* Quick command buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-zinc-400 font-mono mr-1">Быстрый запуск:</span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 text-[11px] font-mono text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-zinc-800/70 transition-all select-none cursor-pointer active:scale-95 touch-manipulation"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window Container */}
        <div className="rounded-2xl border border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden">
          {/* Terminal Header bar */}
          <div className="px-4 py-3 bg-zinc-900/90 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600"></div>
              <span className="text-xs font-mono text-zinc-400 ml-2">
                ascoler@wakeup-archlinux:~
              </span>
            </div>

            <div className="text-[11px] font-mono text-zinc-400 hidden sm:block">
              bash 5.2.26 · Go 1.22 · Python 3.12
            </div>
          </div>

          {/* Terminal Content Body */}
          <div
            ref={terminalBodyRef}
            className="p-5 min-h-[320px] max-h-[460px] overflow-y-auto space-y-4 font-mono text-xs sm:text-sm cursor-text selection:bg-cyan-500/30"
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400 font-bold">ascoler@wakeup</span>
                  <span className="text-zinc-400">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-zinc-400">$</span>
                  <span className="text-white font-medium">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Active input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-bold">ascoler@wakeup</span>
              <span className="text-zinc-400">:</span>
              <span className="text-cyan-400">~</span>
              <span className="text-zinc-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="введите 'help' или команду..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm caret-cyan-400 placeholder-zinc-400"
              />
              <button
                type="submit"
                aria-label="Выполнить команду"
                className="p-1.5 rounded-md text-zinc-400 hover:text-cyan-400 hover:bg-white/5 transition-all select-none cursor-pointer active:scale-90 touch-manipulation"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

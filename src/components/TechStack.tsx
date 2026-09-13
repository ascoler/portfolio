import React from 'react';
import { SKILL_CATEGORIES } from '../data';
import { Cpu, Code2, Server, Database, Layers, CheckCircle } from 'lucide-react';

export const TechStack: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'server':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-indigo-400" />;
      default:
        return <Cpu className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="stack" className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineering Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Технологический арсенал
          </h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-xl">
            Стек инструментов, которые я использую для создания устойчивых к нагрузкам бэкенд-сервисов и автоматизации.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-white/20 p-6 backdrop-blur-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-white/[0.06]">
                <div className="p-2 rounded-lg bg-zinc-800/80 border border-white/10">
                  {getIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {cat.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                      skill.highlight
                        ? 'bg-zinc-800/60 border border-white/10 hover:border-cyan-500/30'
                        : 'bg-zinc-950/40 border border-white/5 hover:bg-zinc-800/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        skill.highlight ? 'bg-cyan-400' : 'bg-zinc-600'
                      }`} />
                      <span className={`text-xs font-mono font-medium ${
                        skill.highlight ? 'text-white font-bold' : 'text-zinc-300'
                      }`}>
                        {skill.name}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-zinc-400">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Project } from '../data';
import { useProjects } from '../context/ProjectsContext';
import { ExternalLink, Star, Server, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';

export const ProjectGrid: React.FC = () => {
  const { projects, isLive, isLoading, totalStars, refresh } = useProjects();
  const [filter, setFilter] = useState<'all' | 'Go' | 'Python'>('all');
  const [activeArch, setActiveArch] = useState(false);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.language === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest">
                <Server className="w-3.5 h-3.5" />
                <span>Production & Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
                  <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isLoading ? 'animate-ping' : 'animate-pulse'}`} />
                  {isLoading ? 'Синхронизация...' : isLive ? 'GitHub Live' : 'GitHub Synced'}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-[11px] font-mono text-amber-300 font-medium">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{totalStars} stars</span>
                </span>
                <button
                  type="button"
                  onClick={() => refresh()}
                  disabled={isLoading}
                  title="Обновить данные звезд с GitHub прямо сейчас"
                  className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-cyan-300 border border-white/10 transition-all select-none cursor-pointer active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
                </button>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Проекты и разработки
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              Реализованные сервисы, распределенные краулеры и фоновые демоны с автоматической синхронизацией метрик с GitHub.
            </p>
          </div>

          {/* Filters - stable borders prevent layout jitter when switching active state */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-900 border border-white/10 self-start md:self-auto gap-1">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border select-none cursor-pointer active:scale-95 touch-manipulation ${
                filter === 'all'
                  ? 'bg-white/10 text-white font-semibold shadow-sm border-white/10'
                  : 'text-zinc-400 hover:text-white border-transparent'
              }`}
            >
              Все ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('Go')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border select-none cursor-pointer active:scale-95 touch-manipulation ${
                filter === 'Go'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border-cyan-500/30'
                  : 'text-zinc-400 hover:text-white border-transparent'
              }`}
            >
              Go (Golang)
            </button>
            <button
              type="button"
              onClick={() => setFilter('Python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border select-none cursor-pointer active:scale-95 touch-manipulation ${
                filter === 'Python'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border-amber-500/30'
                  : 'text-zinc-400 hover:text-white border-transparent'
              }`}
            >
              Python
            </button>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredProjects.map((project) => {
            const isFeatured = project.id === 'spider-go';

            return (
              <div
                key={project.id}
                className={`group rounded-2xl bg-zinc-900/40 border border-white/[0.08] hover:border-white/20 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/5 ${
                  isFeatured && filter === 'all' ? 'md:col-span-2 bg-gradient-to-b from-zinc-900/80 to-zinc-900/40 border-cyan-500/30' : ''
                }`}
              >
                <div>
                  {/* Card top bar */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                        project.language === 'Go'
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {project.language}
                      </span>
                      {project.highlight && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-zinc-300 border border-white/10 hidden sm:inline-block">
                          {project.highlight}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-md border ${
                        project.stars > 0
                          ? 'text-amber-400 bg-amber-400/10 border-amber-400/20 font-semibold'
                          : 'text-zinc-500 bg-zinc-800/30 border-white/5'
                      }`}>
                        <Star className={`w-3.5 h-3.5 ${project.stars > 0 ? 'fill-amber-400 text-amber-400' : 'text-zinc-500'}`} />
                        <span>{project.stars}</span>
                      </div>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all select-none cursor-pointer active:scale-95 touch-manipulation"
                        title="Открыть GitHub репозиторий"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {project.name}
                    <span className="text-xs font-normal text-zinc-400 ml-2 font-mono">
                      // {project.title}
                    </span>
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Architectural breakdown for spider-go */}
                  {project.architecture && isFeatured && (
                    <div className="my-4 p-4 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-semibold text-cyan-300 uppercase tracking-wider">
                          Архитектура распределенной системы
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveArch(!activeArch)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all select-none cursor-pointer active:scale-95 touch-manipulation"
                        >
                          {activeArch ? 'Свернуть схему' : 'Развернуть схему'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                        {project.architecture.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {activeArch && (
                        <div className="mt-4 pt-3 border-t border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                          <pre className="p-3 bg-black/50 rounded-lg text-cyan-300 leading-relaxed">
{`+-------------------------------------------------------------+
|               PRODUCER-CONSUMER CRAWLER CLUSTER              |
+-------------------------------------------------------------+
  [Crawler Service]  --->  (gRPC IPC)  --->  [Queue Service (Redis)]
          |                                          |
          |                                    (Work Items)
          v                                          v
  [Storage Service (MySQL)] <--- (Persist) --- [Worker Pool N]`}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Metrics if present */}
                  {project.metrics && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="px-2.5 py-1 rounded-md bg-zinc-950/80 border border-white/5 text-[11px] font-mono">
                          <span className="text-zinc-400">{m.label}: </span>
                          <span className="text-white font-semibold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags and Link */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-400 border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 group-hover:text-cyan-400 transition-all select-none cursor-pointer active:scale-95 touch-manipulation"
                  >
                    <span>Исходный код</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

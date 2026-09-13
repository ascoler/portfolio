import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PROJECTS as INITIAL_PROJECTS, Project, USER_INFO } from '../data';

interface ProjectsContextType {
  projects: Project[];
  isLive: boolean;
  isLoading: boolean;
  totalStars: number;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: INITIAL_PROJECTS,
  isLive: false,
  isLoading: false,
  totalStars: INITIAL_PROJECTS.reduce((acc, p) => acc + p.stars, 0),
  lastUpdated: null,
  refresh: async () => {},
});

const CACHE_KEY = 'portfolio_github_repos_v3';

interface RawRepoItem {
  name: string;
  stargazers_count?: number;
  stars?: number;
}

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Apply repository data to current projects
  const applyRepoData = useCallback((repos: RawRepoItem[]) => {
    const starMap = new Map<string, number>();

    for (const r of repos) {
      if (!r || !r.name) continue;
      const starCount =
        typeof r.stargazers_count === 'number'
          ? r.stargazers_count
          : typeof r.stars === 'number'
          ? r.stars
          : 0;

      starMap.set(r.name.toLowerCase().trim(), starCount);
    }

    setProjects((prev) =>
      prev.map((proj) => {
        // Match by project name, id, or repo name extracted from githubUrl
        const urlRepoName = proj.githubUrl?.split('/').filter(Boolean).pop()?.toLowerCase() ?? '';
        const liveStars =
          starMap.get(proj.name.toLowerCase().trim()) ??
          starMap.get(proj.id.toLowerCase().trim()) ??
          starMap.get(urlRepoName);

        if (liveStars !== undefined) {
          return { ...proj, stars: liveStars };
        }
        return proj;
      })
    );
    setIsLive(true);
  }, []);

  // Fetch from official GitHub API or ungh.cc fallback
  const fetchFreshData = useCallback(async () => {
    setIsLoading(true);

    try {
      let repos: RawRepoItem[] | null = null;

      // 1. Primary: Official GitHub API with cache buster
      try {
        const ghUrl = `https://api.github.com/users/${USER_INFO.githubUser}/repos?per_page=100&_t=${Date.now()}`;
        const res = await fetch(ghUrl, {
          cache: 'no-store',
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            repos = data;
          }
        } else {
          console.warn(`GitHub API returned status ${res.status}, falling back to ungh mirror`);
        }
      } catch (ghErr) {
        console.warn('GitHub API fetch failed, trying ungh fallback:', ghErr);
      }

      // 2. Fallback: ungh.cc Cloudflare worker proxy (no rate limit)
      if (!repos) {
        try {
          const unghUrl = `https://ungh.cc/users/${USER_INFO.githubUser}/repos?_t=${Date.now()}`;
          const res = await fetch(unghUrl, { cache: 'no-store' });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data?.repos)) {
              repos = data.repos;
            } else if (Array.isArray(data)) {
              repos = data;
            }
          }
        } catch (unghErr) {
          console.warn('ungh mirror fetch also failed:', unghErr);
        }
      }

      // 3. If we got repos, apply and cache
      if (repos && repos.length > 0) {
        applyRepoData(repos);
        const now = new Date();
        setLastUpdated(now);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: repos, timestamp: now.getTime() })
          );
        } catch {
          // ignore localStorage errors
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [applyRepoData]);

  useEffect(() => {
    // 1. Instantly hydrate from cache if available to prevent layout shifts
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Array.isArray(data)) {
          applyRepoData(data);
          if (timestamp) {
            setLastUpdated(new Date(timestamp));
          }
        }
      }
    } catch {
      // ignore
    }

    // 2. Stale-while-revalidate: ALWAYS trigger live fetch on page load
    fetchFreshData();

    // 3. Auto-revalidate when user focuses or returns to window
    const handleFocus = () => {
      fetchFreshData();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [applyRepoData, fetchFreshData]);

  const totalStars = projects.reduce((acc, p) => acc + p.stars, 0);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLive,
        isLoading,
        totalStars,
        lastUpdated,
        refresh: fetchFreshData,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsContext);

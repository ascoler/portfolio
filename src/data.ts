export interface Project {
  id: string;
  title: string;
  name: string;
  tagline: string;
  description: string;
  stars: number;
  language: 'Go' | 'Python' | 'C++' | 'Fullstack';
  tags: string[];
  githubUrl: string;
  featured: boolean;
  architecture?: string[];
  metrics?: { label: string; value: string }[];
  highlight?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: string; highlight?: boolean }[];
}

export const USER_INFO = {
  name: "Фёдор",
  handle: "wake_up",
  githubUser: "ascoler",
  avatarUrl: "https://avatars.githubusercontent.com/u/138858299?v=4",
  role: "Backend & Systems Developer",
  status: "Building distributed systems & Go tooling",
  location: "Russia",
  age: "16 y.o.",
  bio: "Пишу бэкенд и распределенные сервисы на Go и Python. Автоматизирую рутину, проектирую архитектуру очередей и микросервисов. Учусь на реальных задачах и ценю чистую системную архитектуру.",
  quote: "Кодю, учусь, не сплю ☕",
  socials: {
    github: "https://github.com/ascoler",
    telegram: "https://t.me/wakeupsd",
    telegramHandle: "@wakeupsd",
    email: "fsokovnin@gmail.com",
    leetcode: "https://leetcode.com/u/wake_upik/",
    leetcodeHandle: "wake_upik"
  }
};

export const PROJECTS: Project[] = [
  {
    id: "spider-go",
    name: "spider-go",
    title: "Go Distributed Web Crawler",
    tagline: "Распределенная многосервисная система краулинга с паттерном Producer-Consumer",
    description: "Высокопроизводительная система распределенного сбора данных на Go. Включает микросервис парсинга HTML, очередь ссылок в Redis, персистентное хранилище в MySQL и межсервисное gRPC-взаимодействие с пулом параллельных воркеров.",
    stars: 2,
    language: "Go",
    featured: true,
    tags: ["Go", "gRPC", "Redis", "MySQL", "Concurrency", "Microservices"],
    githubUrl: "https://github.com/ascoler/spider-go",
    highlight: "gRPC + Redis Queue + Parallel Workers",
    architecture: [
      "Crawler Service — HTML parsing & link extraction",
      "Queue Service — Redis-based URL management",
      "Storage Service — MySQL data persistence",
      "gRPC inter-service communication",
      "Concurrent workers for parallel processing"
    ],
    metrics: [
      { label: "Architecture", value: "Producer-Consumer" },
      { label: "IPC", value: "gRPC" },
      { label: "Queue", value: "Redis" }
    ]
  },
  {
    id: "git-ghost",
    name: "git-ghost",
    title: "Git Ghost Daemon",
    tagline: "Фоновый демон автоматического резервного копирования git-репозиториев",
    description: "Легковесный фоновый демон на Go, отслеживающий изменения в рабочих директориях и выполняющий автоматический бэкап и синхронизацию без прерывания рабочего процесса.",
    stars: 1,
    language: "Go",
    featured: true,
    tags: ["Go", "CLI Daemon", "Git Automation", "File Watcher", "System"],
    githubUrl: "https://github.com/ascoler/git-ghost",
    highlight: "Autonomous Background Sync",
    metrics: [
      { label: "Runtime", value: "Zero-dependency binary" },
      { label: "Footprint", value: "< 15MB RAM" }
    ]
  },
  {
    id: "gowik",
    name: "Gowik",
    title: "High-Performance Go Wiki",
    tagline: "Движок персональной и командной Wiki на чистом Go с поддержкой HTML и шаблонов",
    description: "Быстрый сервер документации и вики-статей, скомпилированный в один бинарник. Поддержка парсинга разметки, динамической маршрутизации и чистого рендеринга.",
    stars: 0,
    language: "Go",
    featured: false,
    tags: ["Go", "Web Server", "HTML Engine", "Markdown", "Templates"],
    githubUrl: "https://github.com/ascoler/Gowik",
    highlight: "Fast Single-Binary Wiki"
  },
  {
    id: "o2",
    name: "O2",
    title: "O2 Engine",
    tagline: "Высокоэффективный бэкенд и автоматизация сервисов на Python",
    description: "Проект с акцентом на производительность и оптимизацию внутренней логики приложений на Python.",
    stars: 3,
    language: "Python",
    featured: true,
    tags: ["Python", "AsyncIO", "API", "High Performance"],
    githubUrl: "https://github.com/ascoler/O2",
    highlight: "AsyncIO + High Performance Engine"
  },
  {
    id: "fashion-assistant",
    name: "Fashion-Assistant",
    title: "AI Fashion & Style Assistant",
    tagline: "Интеллектуальный ассистент и бэкенд для рекомендаций",
    description: "Интеграция современных AI-моделей в прикладной бэкенд-сервис для анализа и подбора образов.",
    stars: 0,
    language: "Python",
    featured: false,
    tags: ["Python", "FastAPI", "AI Integration", "REST API"],
    githubUrl: "https://github.com/ascoler/Fashion-Assistant",
    highlight: "AI-Powered Assistant"
  },
  {
    id: "goquest",
    name: "Goquest",
    title: "Goquest Engine",
    tagline: "Экспериментальный системный CLI инструмент на Go",
    description: "Интерактивная консольная логика и эксперименты с низкоуровневой обработкой ввода/вывода на Go.",
    stars: 0,
    language: "Go",
    featured: false,
    tags: ["Go", "Terminal CLI", "Algorithms"],
    githubUrl: "https://github.com/ascoler/Goquest"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Languages",
    icon: "code",
    skills: [
      { name: "Go (Golang)", level: "Primary", highlight: true },
      { name: "Python 3.12+", level: "Primary", highlight: true },
      { name: "C++", level: "Algorithms & Low-level" },
      { name: "TypeScript / JS", level: "Fullstack / APIs" },
      { name: "SQL", level: "Relational queries" }
    ]
  },
  {
    title: "Backend & Systems",
    icon: "server",
    skills: [
      { name: "Gin / Net-HTTP", level: "Go Microservices", highlight: true },
      { name: "gRPC & Protobuf", level: "Inter-service IPC", highlight: true },
      { name: "FastAPI", level: "Async Python APIs", highlight: true },
      { name: "Django", level: "Web Architecture" },
      { name: "Concurrency & Goroutines", level: "Workers & Pipelines", highlight: true }
    ]
  },
  {
    title: "Data & Storage",
    icon: "database",
    skills: [
      { name: "Redis", level: "Queues & Pub/Sub", highlight: true },
      { name: "PostgreSQL", level: "Complex Schemas" },
      { name: "MySQL", level: "Production Storage" },
      { name: "MongoDB", level: "Document Store" },
      { name: "SQLite", level: "Embedded & Testing" }
    ]
  },
  {
    title: "Infrastructure & Tools",
    icon: "cpu",
    skills: [
      { name: "Docker & Compose", level: "Containerization", highlight: true },
      { name: "Linux / Bash", level: "Environment of Choice", highlight: true },
      { name: "Nginx", level: "Reverse Proxy" },
      { name: "Git & GitHub", level: "VCS & CI" },
      { name: "Neovim & VS Code", level: "Power Editor Setup" }
    ]
  }
];

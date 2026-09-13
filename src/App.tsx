import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ProjectGrid } from './components/ProjectGrid';
import { TechStack } from './components/TechStack';
import { LeetCodeCard } from './components/LeetCodeCard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-cyan-500/20 selection:text-cyan-300 relative font-sans overflow-x-hidden">
      {/* Sleek Interactive Background */}
      <Background />

      {/* Content wrapper */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ProjectGrid />
          <InteractiveTerminal />
          <TechStack />
          <LeetCodeCard />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;

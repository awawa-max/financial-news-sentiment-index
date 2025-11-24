import React, { useState } from 'react';
import LiveDashboard from './components/LiveDashboard';
import AnalysisDashboard from './components/AnalysisDashboard';
import TechnicalSpecs from './components/TechnicalSpecs';
import { LayoutDashboard, Terminal, Code2, TrendingUp, Github } from 'lucide-react';

enum Tab {
  DASHBOARD = 'DASHBOARD',
  ANALYSIS = 'ANALYSIS',
  DOCS = 'DOCS'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              FinSent
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg border border-slate-700">
            <button 
              onClick={() => setActiveTab(Tab.DASHBOARD)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === Tab.DASHBOARD ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Live Dashboard
            </button>
            <button 
              onClick={() => setActiveTab(Tab.ANALYSIS)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === Tab.ANALYSIS ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <Terminal className="w-4 h-4" /> Text Analyzer
            </button>
            <button 
              onClick={() => setActiveTab(Tab.DOCS)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === Tab.DOCS ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
            >
              <Code2 className="w-4 h-4" /> Architecture
            </button>
          </nav>

          <div className="flex items-center gap-3">
             <a href="#" className="p-2 text-slate-400 hover:text-white transition-colors">
               <Github className="w-5 h-5" />
             </a>
             <div className="h-4 w-px bg-slate-700"></div>
             <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
               System Online
             </span>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden border-b border-slate-800 bg-slate-900 p-2 flex justify-around">
          <button onClick={() => setActiveTab(Tab.DASHBOARD)} className={`p-2 ${activeTab === Tab.DASHBOARD ? 'text-indigo-400' : 'text-slate-500'}`}><LayoutDashboard /></button>
          <button onClick={() => setActiveTab(Tab.ANALYSIS)} className={`p-2 ${activeTab === Tab.ANALYSIS ? 'text-indigo-400' : 'text-slate-500'}`}><Terminal /></button>
          <button onClick={() => setActiveTab(Tab.DOCS)} className={`p-2 ${activeTab === Tab.DOCS ? 'text-indigo-400' : 'text-slate-500'}`}><Code2 /></button>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="space-y-8">
          
          {/* Header Section for current view */}
          <div className="mb-6">
             <h2 className="text-3xl font-bold text-white">
               {activeTab === Tab.DASHBOARD && 'Real-Time Market Sentiment'}
               {activeTab === Tab.ANALYSIS && 'Ad-Hoc NLP Analysis'}
               {activeTab === Tab.DOCS && 'Pipeline Architecture'}
             </h2>
             <p className="text-slate-400 mt-2">
               {activeTab === Tab.DASHBOARD && 'Live analysis of global news streams (Bloomberg, Reuters, CNBC) powered by Gemini Search Grounding.'}
               {activeTab === Tab.ANALYSIS && 'Test the NLP engine with custom financial text inputs.'}
               {activeTab === Tab.DOCS && 'Technical breakdown of the NLTK/SpaCy implementation.'}
             </p>
          </div>

          {/* Dynamic Content */}
          <div className={activeTab === Tab.DASHBOARD ? 'block' : 'hidden'}>
             <LiveDashboard />
          </div>

          <div className={activeTab === Tab.ANALYSIS ? 'block' : 'hidden'}>
            <AnalysisDashboard />
          </div>

          <div className={activeTab === Tab.DOCS ? 'block' : 'hidden'}>
            <TechnicalSpecs />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © 2024 FinSent Project. Designed for Resume Demonstration.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
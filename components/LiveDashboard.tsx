import React, { useState, useEffect } from 'react';
import MarketChart from './MarketChart';
import { getLiveMarketAnalysis } from '../services/geminiService';
import { LiveMarketData } from '../types';
import { RefreshCw, Globe, ExternalLink, Newspaper, Zap } from 'lucide-react';

const LiveDashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LiveMarketData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getLiveMarketAnalysis();
      setData(result);
    } catch (err) {
      setError("Failed to load live data. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Simple Markdown-like parser for the specific output format requested
  const renderAnalysisContent = (text: string) => {
    // Split by headers we requested in the prompt
    const parts = text.split('##');
    return parts.map((part, index) => {
      if (!part.trim()) return null;
      
      const [title, ...content] = part.split(':');
      const body = content.join(':').trim() || part;
      
      if (title.trim().includes('Daily Sentiment Index')) {
         const score = body.match(/\d+/)?.[0] || '50';
         return (
             <div key={index} className="bg-slate-800/80 p-6 rounded-xl border border-indigo-500/30 mb-6 flex flex-col items-center justify-center text-center shadow-lg shadow-indigo-500/10">
                <h4 className="text-indigo-300 text-sm font-medium uppercase tracking-wider mb-2">Real-Time Sentiment Index</h4>
                <div className="text-5xl font-bold text-white mb-2">{score}<span className="text-2xl text-slate-400">/100</span></div>
                <div className="w-full h-3 bg-slate-700 rounded-full mt-2 overflow-hidden max-w-xs">
                    <div 
                        className={`h-full transition-all duration-1000 ${Number(score) > 50 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
                <p className="text-xs text-slate-400 mt-2">0 = Extreme Fear, 100 = Extreme Greed</p>
             </div>
         );
      }
      
      if (title.trim().includes('Market Prediction')) {
          return (
              <div key={index} className="bg-gradient-to-r from-slate-800 to-slate-800/50 p-6 rounded-xl border border-slate-700 mb-6">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" /> Market Prediction
                 </h3>
                 <p className="text-lg text-slate-200 leading-relaxed">{body}</p>
              </div>
          );
      }

      if (title.trim().includes('Key Headlines') || title.trim().includes('Headlines')) {
         return (
             <div key={index} className="space-y-4">
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-blue-400" /> Key News Drivers
                 </h3>
                 <div className="prose prose-invert prose-sm max-w-none bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                    <pre className="whitespace-pre-wrap font-sans text-slate-300">{body}</pre>
                 </div>
             </div>
         );
      }

      return <div key={index} className="text-slate-300 text-sm mb-4">{part}</div>;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
      {/* Left Column: Charts & Metrics */}
      <div className="lg:col-span-2 space-y-8">
        <MarketChart />
        
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" /> 
                Live Market Pulse
                {data && <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">Updated: {data.timestamp}</span>}
            </h3>
            <button 
                onClick={fetchData} 
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Scraping News...' : 'Refresh Data'}
            </button>
        </div>

        {error ? (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-300 text-sm">
                {error}
            </div>
        ) : data ? (
            <div className="space-y-6">
                 {/* Custom rendering of the AI report */}
                 {renderAnalysisContent(data.analysisText)}
            </div>
        ) : (
            <div className="h-64 flex flex-col items-center justify-center bg-slate-800/30 rounded-xl border border-slate-700 border-dashed">
                <RefreshCw className="w-8 h-8 text-slate-600 animate-spin mb-4" />
                <p className="text-slate-400">Connecting to news streams...</p>
            </div>
        )}
      </div>

      {/* Right Column: Sources & Feed */}
      <div className="space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 h-full">
            <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                Verified Sources
            </h3>
            
            {loading ? (
                <div className="space-y-3">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-16 bg-slate-700/30 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            ) : data?.sources && data.sources.length > 0 ? (
                <div className="space-y-3">
                    {data.sources.map((source, i) => (
                        <a 
                            key={i} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/50 hover:border-indigo-500/50 transition-all group"
                        >
                            <div className="text-xs text-indigo-300 mb-1 flex items-center gap-1">
                                <Globe className="w-3 h-3" /> Source {i + 1}
                            </div>
                            <div className="text-sm text-slate-300 group-hover:text-white line-clamp-2 leading-snug">
                                {source.title}
                            </div>
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-slate-500 italic">No sources cited yet.</p>
            )}

            <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-500">
                <p className="font-semibold text-slate-400 mb-1">Methodology Note:</p>
                Real-time scraping is performed via Google Search Grounding to bypass browser CORS restrictions. The sentiment engine analyzes these search snippets dynamically to construct the index.
            </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
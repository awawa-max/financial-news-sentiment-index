import React, { useState } from 'react';
import { analyzeNewsSentiment } from '../services/geminiService';
import { AnalysisResult, SentimentType } from '../types';
import { Activity, ArrowUpRight, ArrowDownRight, Minus, BrainCircuit, Loader2 } from 'lucide-react';

const AnalysisDashboard: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    try {
      const data = await analyzeNewsSentiment(inputText);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Please check your API key or connection.");
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (type: SentimentType) => {
    switch (type) {
      case SentimentType.BULLISH: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case SentimentType.BEARISH: return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getSentimentIcon = (type: SentimentType) => {
    switch (type) {
      case SentimentType.BULLISH: return <ArrowUpRight className="w-6 h-6" />;
      case SentimentType.BEARISH: return <ArrowDownRight className="w-6 h-6" />;
      default: return <Minus className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
          <BrainCircuit className="w-5 h-5 text-indigo-400" />
          Live News Analyzer
        </h2>
        <p className="text-slate-400 text-sm mb-4">
          Paste a news headline or article snippet below. The system utilizes an NLP pipeline (simulated via Gemini 2.5) to extract sentiment and predict market impact.
        </p>
        
        <textarea
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none h-32"
          placeholder="E.g., Tech giant releases Q3 earnings report showing 20% growth year-over-year, surpassing analyst expectations..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={loading || !inputText.trim()}
            className={`
              flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all
              ${loading || !inputText.trim() 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'}
            `}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
            {loading ? 'Processing...' : 'Analyze Sentiment'}
          </button>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {/* Main Score Card */}
          <div className="md:col-span-1 bg-slate-800/50 rounded-xl p-6 border border-slate-700 flex flex-col justify-center items-center text-center">
            <div className={`p-4 rounded-full mb-4 ${getSentimentColor(result.sentimentLabel)}`}>
              {getSentimentIcon(result.sentimentLabel)}
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{result.sentimentLabel}</h3>
            <p className="text-slate-400 text-sm">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
            <div className="mt-6 w-full">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Bearish (-1.0)</span>
                <span>Bullish (+1.0)</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${result.sentimentScore >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  style={{ 
                    width: `${Math.abs(result.sentimentScore) * 100}%`,
                    marginLeft: result.sentimentScore < 0 ? '0' : '0', // Simplified visualization logic
                    transformOrigin: result.sentimentScore < 0 ? 'right' : 'left'
                    // Note: A true centered bar requires more CSS, simplified for demo
                  }}
                />
              </div>
              <div className="text-xs text-center mt-2 font-mono text-slate-300">
                Score: {result.sentimentScore.toFixed(3)}
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="md:col-span-2 bg-slate-800/50 rounded-xl p-6 border border-slate-700 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Analysis Report</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Summary</span>
                  <p className="text-slate-300 mt-1">{result.summary}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Market Prediction</span>
                  <p className="text-indigo-300 mt-1 font-medium">{result.marketPrediction}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Identified Entities</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.entities.map((entity, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs border border-slate-600">
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisDashboard;

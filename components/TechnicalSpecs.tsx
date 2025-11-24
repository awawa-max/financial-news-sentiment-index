import React from 'react';
import { Database, FileText, Server, BarChart3, Workflow } from 'lucide-react';

const TechnicalSpecs: React.FC = () => {
  return (
    <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">System Architecture & Methodology</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Step 1 */}
        <div className="relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mb-4 border border-slate-600 shadow-lg">
              <Database className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Data Ingestion</h3>
            <p className="text-sm text-slate-400">
              Aggregating unstructured financial news from RSS feeds and APIs.
            </p>
          </div>
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-8 -right-4 w-8 border-t-2 border-slate-600 border-dashed"></div>
        </div>

        {/* Step 2 */}
        <div className="relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mb-4 border border-slate-600 shadow-lg">
              <Workflow className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">2. Preprocessing</h3>
            <p className="text-sm text-slate-400">
              <span className="text-purple-300 font-mono">SpaCy</span> for tokenization, lemmatization, and removing stop words. NER for identifying tickers.
            </p>
          </div>
           <div className="hidden md:block absolute top-8 -right-4 w-8 border-t-2 border-slate-600 border-dashed"></div>
        </div>

        {/* Step 3 */}
        <div className="relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mb-4 border border-slate-600 shadow-lg">
              <FileText className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Sentiment Scoring</h3>
            <p className="text-sm text-slate-400">
              <span className="text-pink-300 font-mono">NLTK VADER</span> or FinBERT model to calculate compound polarity scores (-1 to +1).
            </p>
          </div>
           <div className="hidden md:block absolute top-8 -right-4 w-8 border-t-2 border-slate-600 border-dashed"></div>
        </div>

        {/* Step 4 */}
        <div className="relative">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center mb-4 border border-slate-600 shadow-lg">
              <BarChart3 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">4. Index Construction</h3>
            <p className="text-sm text-slate-400">
              Aggregating scores into a daily moving average index to correlate with volatility.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg text-sm text-indigo-200">
        <strong className="block mb-1 text-indigo-400">Resume Context:</strong>
        This project demonstrates the implementation of a full NLP pipeline for financial analytics. While the live demo above uses the <strong>Gemini API</strong> to simulate real-time inference in the browser, the underlying logic reflects standard Python data engineering practices using libraries like NLTK, SpaCy, and Scikit-learn.
      </div>
    </div>
  );
};

export default TechnicalSpecs;

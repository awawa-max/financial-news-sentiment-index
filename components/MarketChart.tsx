import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart
} from 'recharts';
import { ChartDataPoint } from '../types';

// Mock data generation to simulate the correlation between Sentiment Index and Market Price
const generateMockData = (): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  let marketPrice = 4100;
  let sentiment = 50;
  const date = new Date();
  date.setDate(date.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    // Random walk with correlation
    const noise = (Math.random() - 0.5) * 10;
    const sentimentChange = (Math.random() - 0.5) * 15;
    
    sentiment = Math.max(0, Math.min(100, sentiment + sentimentChange));
    
    // Market reacts to sentiment with a slight lag/correlation
    const marketChange = (sentiment - 50) * 2 + noise;
    marketPrice += marketChange;

    data.push({
      date: new Date(date.setDate(date.getDate() + 1)).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sentimentIndex: Number(sentiment.toFixed(1)),
      marketIndex: Number(marketPrice.toFixed(2)),
    });
  }
  return data;
};

const data = generateMockData();

const MarketChart: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Sentiment vs. Market Index</h3>
          <p className="text-sm text-slate-400">30-Day Historical Correlation Analysis</p>
        </div>
        <div className="flex gap-4 text-xs">
           <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span className="text-slate-300">Sentiment Index</span>
           </div>
           <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300">S&P 500 (Simulated)</span>
           </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            yAxisId="left" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            domain={[0, 100]}
            label={{ value: 'Sentiment (0-100)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            domain={['auto', 'auto']}
            label={{ value: 'Market Price', angle: 90, position: 'insideRight', fill: '#64748b' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="sentimentIndex" 
            stroke="#6366f1" 
            fillOpacity={1} 
            fill="url(#colorSentiment)" 
            strokeWidth={2}
            name="Sentiment Score"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="marketIndex" 
            stroke="#34d399" 
            strokeWidth={2} 
            dot={false}
            name="Market Index"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;

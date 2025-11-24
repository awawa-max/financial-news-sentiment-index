export enum SentimentType {
  BULLISH = 'Bullish',
  BEARISH = 'Bearish',
  NEUTRAL = 'Neutral'
}

export interface AnalysisResult {
  sentimentScore: number; // -1 to 1
  sentimentLabel: SentimentType;
  confidence: number;
  entities: string[];
  summary: string;
  marketPrediction: string;
}

export interface ChartDataPoint {
  date: string;
  sentimentIndex: number; // 0-100 scale
  marketIndex: number; // e.g., S&P 500 normalized
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  time: string;
  sentiment: SentimentType;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface LiveMarketData {
  analysisText: string;
  sources: GroundingSource[];
  timestamp: string;
}
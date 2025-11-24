import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, LiveMarketData, GroundingSource } from "../types";

// Initialize Gemini client
// Note: API Key comes from environment variable as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeNewsSentiment = async (text: string): Promise<AnalysisResult> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze the following financial news text for sentiment specifically regarding stock market impact. 
      Perform simulated NLTK/SpaCy pipeline tasks: Entity Recognition (NER) and Sentiment Scoring.
      
      Text to analyze: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentimentScore: {
              type: Type.NUMBER,
              description: "A float between -1.0 (Very Negative) and 1.0 (Very Positive).",
            },
            sentimentLabel: {
              type: Type.STRING,
              enum: ["Bullish", "Bearish", "Neutral"],
              description: "The overall market sentiment classification.",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence score between 0 and 1.",
            },
            entities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key financial entities (companies, tickers, commodities) identified.",
            },
            summary: {
              type: Type.STRING,
              description: "A one-sentence summary of the financial implication.",
            },
            marketPrediction: {
              type: Type.STRING,
              description: "Short-term market prediction (e.g., 'Stock likely to rise in short term').",
            }
          },
          required: ["sentimentScore", "sentimentLabel", "confidence", "entities", "summary", "marketPrediction"],
        },
        systemInstruction: "You are a sophisticated financial sentiment analysis engine designed to mimic the output of a Python NLTK/SpaCy pipeline trained on financial news datasets. Be technical, precise, and objective.",
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(jsonText);
    
    return data as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze sentiment. Please try again.");
  }
};

export const getLiveMarketAnalysis = async (): Promise<LiveMarketData> => {
  try {
    // Using gemini-2.5-flash for speed with search tool
    const model = 'gemini-2.5-flash';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Perform a real-time financial sentiment analysis for the US Stock Market (focus on S&P 500 and major tech sectors).
      
      Tasks:
      1. Search for the latest financial news headlines from the last 24 hours.
      2. Identify the top 3-5 most impactful stories.
      3. For each story, determine the sentiment (Bullish/Bearish/Neutral).
      4. Calculate an aggregate 'Daily Sentiment Index' (0-100 scale, where 0 is Extreme Fear, 100 is Extreme Greed).
      5. Provide a short-term market prediction based on this news.
      
      Output format:
      Provide a clear, structured markdown report.
      Start with "## Daily Sentiment Index: [Score]/100".
      Follow with "## Market Prediction: [Prediction]".
      Then list the "## Key Headlines".`,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType JSON is NOT supported with googleSearch tool
      }
    });

    const analysisText = response.text || "No analysis generated.";
    
    // Extract grounding chunks (sources)
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    chunks.forEach((chunk: any) => {
      if (chunk.web) {
        sources.push({
          title: chunk.web.title || "News Source",
          uri: chunk.web.uri
        });
      }
    });

    return {
      analysisText,
      sources,
      timestamp: new Date().toLocaleTimeString()
    };

  } catch (error) {
    console.error("Live Market Analysis Error:", error);
    throw new Error("Failed to fetch live market data.");
  }
};
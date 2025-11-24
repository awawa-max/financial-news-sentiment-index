financial-news-sentiment-index/
│
├── data/
│   ├── raw_news/            # 原始新闻数据
│   ├── processed_news/      # 清洗后的文本
│   ├── market_data/         # 股票/指数行情数据
│   └── sentiment_index/     # 生成的情绪指数
│
├── notebooks/
│   ├── data_cleaning.ipynb          # 文本预处理
│   ├── sentiment_analysis.ipynb     # 情绪得分计算
│   ├── index_construction.ipynb     # 情绪指数构建
│   └── prediction_model.ipynb       # 回归/预测模型
│
├── src/
│   ├── fetch_news.py                # 新闻抓取脚本
│   ├── preprocess.py                # 分词、去停用词等
│   ├── sentiment.py                 # NLTK/SpaCy情绪分析
│   ├── build_index.py               # 构建情绪指数
│   └── predict.py                   # 建模预测股票收益
│
├── utils/
│   ├── config.py
│   └── helpers.py
│
├── requirements.txt
├── README.md
├── LICENSE
└── .gitignore

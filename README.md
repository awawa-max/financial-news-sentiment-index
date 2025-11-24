# Financial News Sentiment Index  
基于 NLP 的财经新闻情绪指数构建项目  
*Financial News Sentiment Index Construction with NLP*

---

## 🧩 项目简介

**Financial News Sentiment Index** 是一个利用 NLP（NLTK / SpaCy）对财经新闻进行情绪识别与量化的项目，旨在构建 **新闻情绪指数** 并用于预测股票市场的 **短期收益**。

本项目试图回答一个核心问题：

> **财经新闻情绪能否预测股票的短期涨跌？**

项目提供完整的金融新闻情绪分析流程：

### ✔ 数据抓取  
- 主流财经媒体新闻标题/正文  
- 分钟级 / 日级数据  

### ✔ 文本预处理  
- SpaCy 分词  
- 去停用词  
- 词性标注  
- 命名实体识别（公司、机构、政策）  

### ✔ 情绪分析  
- 基于 VADER / TextBlob 的词典式模型  
- 可扩展：SVM / Logistic Regression 分类器  

### ✔ 情绪指数构建  
- 基于时间聚合的 Market Sentiment Index (MSI)  
- 支持按行业 / 事件 / 市场类型构建子指数  

### ✔ 股市预测  
- 情绪指数与股票收益率回归  
- Granger 因果检验  
- 随机森林 / XGBoost 等预测模型  

### ✔ 可视化  
- MSI 时间序列  
- 情绪–收益散点图  
- 事件冲击分析  

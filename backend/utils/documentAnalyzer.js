export async function analyzeDocumentContent(text, language, genAI) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate prompts for different aspects of analysis
    const prompts = {
      documentType: `Analyze this text and identify the type of document it is (e.g., contract, invoice, letter, etc.). Respond with just the document type in a single word or short phrase: ${text}`,
      summary: `Provide a simple, easy-to-understand summary of this document in layman's terms. Keep it concise and clear: ${text}`,
      keyPoints: `Extract the 3-5 most important points from this document. Present them in simple, clear language that anyone can understand. Format as a bulleted list: ${text}`
    };

    // Get document type
    const typeResult = await model.generateContent(prompts.documentType);
    const documentType = typeResult.response.text().trim();

    // Get summary
    const summaryResult = await model.generateContent(prompts.summary);
    const summary = summaryResult.response.text().trim();

    // Get key points
    const pointsResult = await model.generateContent(prompts.keyPoints);
    const keyPointsText = pointsResult.response.text().trim();
    const keyPoints = keyPointsText
      .split('\n')
      .filter(point => point.trim().startsWith('-') || point.trim().startsWith('•'))
      .map(point => point.replace(/^[-•]\s*/, '').trim())
      .filter(point => point.length > 0);

    return {
      documentType,
      summary,
      keyPoints
    };
  } catch (error) {
    console.error('Document analysis error:', error);
    throw new Error('Failed to analyze document content');
  }
} 
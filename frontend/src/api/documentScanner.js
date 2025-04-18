import axios from './axios';

export const analyzeDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('document', file);

    const response = await axios.post('/document-scanner/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000, // 60 second timeout for processing
    });

    if (!response.data || !response.data.analysis) {
      throw new Error('No analysis was generated from the document');
    }

    return response.data;
  } catch (error) {
    console.error('Document analysis error:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to analyze document');
    } else if (error.request) {
      throw new Error('Server is not responding. Please try again later.');
    } else {
      throw new Error('An error occurred while analyzing the document');
    }
  }
};

export const getDocumentHistory = async () => {
  const response = await axios.get('/document-scanner/history');
  return response.data;
};

export const getDocumentDetails = async (documentId) => {
  const response = await axios.get(`/document-scanner/${documentId}`);
  return response.data;
};

export const processPDF = async (file) => {
  const formData = new FormData();
  formData.append('document', file);

  const response = await axios.post('/document-scanner/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const processDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/document-scanner/process', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 second timeout
    });

    if (!response.data || !response.data.text) {
      throw new Error('No text was extracted from the document');
    }

    return response.data;
  } catch (error) {
    console.error('Document processing error:', error);
    if (error.response) {
      // Server responded with an error
      throw new Error(error.response.data.message || 'Failed to process document');
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Server is not responding. Please try again later.');
    } else {
      // Something else went wrong
      throw new Error('An error occurred while processing the document');
    }
  }
};

export const summarizeText = async (text) => {
  try {
    const response = await axios.post('/document-scanner/summarize', { 
      text,
      options: {
        language: 'simple',
        maxLength: 200,
        format: 'paragraph',
        style: 'legal'
      }
    });

    if (!response.data || !response.data.summary) {
      throw new Error('Failed to generate summary');
    }

    return response.data;
  } catch (error) {
    console.error('Summarization error:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to generate summary');
    } else {
      throw new Error('An error occurred while generating the summary');
    }
  }
}; 
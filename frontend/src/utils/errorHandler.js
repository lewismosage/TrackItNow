export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const message = error.response.data?.message || 'An error occurred';
    
    switch (status) {
      case 400:
        console.error('Bad Request:', message);
        return `Invalid request: ${message}`;
      case 401:
        console.error('Unauthorized:', message);
        return 'Please login to continue';
      case 403:
        console.error('Forbidden:', message);
        return 'You do not have permission to perform this action';
      case 404:
        console.error('Not Found:', message);
        return 'Resource not found';
      case 500:
        console.error('Server Error:', message);
        return 'Internal server error. Please try again later';
      default:
        console.error('API Error:', message);
        return 'An unexpected error occurred';
    }
  } else if (error.request) {
    // Request made but no response
    console.error('Network Error:', error.request);
    return 'Network error. Please check your connection';
  } else {
    // Error in request configuration
    console.error('Request Error:', error.message);
    return 'Error in making request';
  }
}; 
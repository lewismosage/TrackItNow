import axiosInstance from '../utils/axiosConfig';
import { handleApiError } from '../utils/errorHandler';

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/endpoint');
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
}; 
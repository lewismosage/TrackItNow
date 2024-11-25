import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchLocations = async () => {
    try {
        console.log('Fetching locations from:', `${BASE_URL}/locations`);
        const response = await axios.get(`${BASE_URL}/locations`);
        console.log('Location response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error details:', error.response || error);
        throw new Error(error.response?.data?.error || 'Failed to fetch locations');
    }
};

export const addLocation = async (locationData) => {
    try {
        const response = await axios.post(`${BASE_URL}/locations`, locationData);
        return response.data;
    } catch (error) {
        console.error('Error adding location:', error);
        throw error;
    }
};

export const updateLocation = async (locationId, locationData) => {
    try {
        const response = await axios.put(`${BASE_URL}/locations/${locationId}`, locationData);
        return response.data;
    } catch (error) {
        console.error('Error updating location:', error);
        throw error;
    }
};

export const deleteLocation = async (locationId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/locations/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
}; 
import api from '../utils/axios';

export const fetchLocations = async () => {
    try {
        console.log('Fetching locations...');
        const response = await api.get('/locations');
        console.log('Location response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error details:', error.response || error);
        throw new Error(error.response?.data?.error || 'Failed to fetch locations');
    }
};

export const addLocation = async (locationData) => {
    try {
        const response = await api.post('/locations', locationData);
        return response.data;
    } catch (error) {
        console.error('Error adding location:', error);
        throw error;
    }
};

export const updateLocation = async (locationId, locationData) => {
    try {
        const response = await api.put(`/locations/${locationId}`, locationData);
        return response.data;
    } catch (error) {
        console.error('Error updating location:', error);
        throw error;
    }
};

export const deleteLocation = async (locationId) => {
    try {
        const response = await api.delete(`/locations/${locationId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting location:', error);
        throw error;
    }
}; 
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Debug axios requests
axios.interceptors.request.use(request => {
    console.log('Starting Request:', request.method, request.url);
    return request;
});

export const fetchInventoryItems = async () => {
    try {
        console.log('Fetching inventory from:', `${BASE_URL}/inventory`);
        const response = await axios.get(`${BASE_URL}/inventory`);
        console.log('Inventory response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Full error:', error);
        console.error('Error response:', error.response);
        throw new Error(error.response?.data?.error || 'Failed to fetch inventory items');
    }
};

export const addInventoryItem = async (itemData) => {
    try {
        const response = await axios.post(`${BASE_URL}/inventory`, itemData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add inventory item');
    }
};

export const updateInventoryItem = async (itemId, itemData) => {
    try {
        const response = await axios.put(`${BASE_URL}/inventory/${itemId}`, itemData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update inventory item');
    }
};

export const deleteInventoryItem = async (itemId) => {
    try {
        await axios.delete(`${BASE_URL}/inventory/${itemId}`);
        return true;
    } catch (error) {
        throw new Error('Failed to delete inventory item');
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/inventory/categories`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
}; 
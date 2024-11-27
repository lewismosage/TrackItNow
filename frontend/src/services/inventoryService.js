import api from '../utils/axios';

export const fetchInventoryItems = async () => {
    try {
        console.log('Fetching inventory...');
        const response = await api.get('/inventory');
        return response.data;
    } catch (error) {
        console.error('Error fetching inventory:', error);
        throw error;
    }
};

export const addInventoryItem = async (itemData) => {
    try {
        const response = await api.post('/inventory', itemData);
        return response.data;
    } catch (error) {
        console.error('Error adding inventory item:', error);
        throw new Error('Failed to add inventory item');
    }
};

export const updateInventoryItem = async (itemId, itemData) => {
    try {
        const response = await api.put(`/inventory/${itemId}`, itemData);
        return response.data;
    } catch (error) {
        console.error('Error updating inventory item:', error);
        throw new Error('Failed to update inventory item');
    }
};

export const deleteInventoryItem = async (itemId) => {
    try {
        const response = await api.delete(`/inventory/${itemId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        throw new Error('Failed to delete inventory item');
    }
};

export const fetchCategories = async () => {
    try {
        const response = await api.get('/inventory/categories');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
}; 
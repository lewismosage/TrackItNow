import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchWarehouses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/warehouses`);
        return response.data;
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        throw error;
    }
};

export const createWarehouse = async (warehouseData) => {
    try {
        const response = await axios.post(`${BASE_URL}/warehouses`, warehouseData);
        return response.data;
    } catch (error) {
        console.error('Error creating warehouse:', error);
        throw error;
    }
};

export const updateWarehouse = async (warehouseId, warehouseData) => {
    try {
        const response = await axios.put(`${BASE_URL}/warehouses/${warehouseId}`, warehouseData);
        return response.data;
    } catch (error) {
        console.error('Error updating warehouse:', error);
        throw error;
    }
};

export const deleteWarehouse = async (warehouseId) => {
    try {
        await axios.delete(`${BASE_URL}/warehouses/${warehouseId}`);
        return true;
    } catch (error) {
        console.error('Error deleting warehouse:', error);
        throw error;
    }
}; 
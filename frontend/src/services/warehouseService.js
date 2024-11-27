import api from '../utils/axios';

export const fetchWarehouses = async () => {
    try {
        const response = await api.get('/warehouses');
        return response.data;
    } catch (error) {
        console.error('Error fetching warehouses:', error);
        throw error;
    }
};

export const createWarehouse = async (warehouseData) => {
    try {
        const response = await api.post('/warehouses', warehouseData);
        return response.data;
    } catch (error) {
        console.error('Error creating warehouse:', error);
        throw error;
    }
};

export const updateWarehouse = async (warehouseId, warehouseData) => {
    try {
        const response = await api.put(`/warehouses/${warehouseId}`, warehouseData);
        return response.data;
    } catch (error) {
        console.error('Error updating warehouse:', error);
        throw error;
    }
};

export const deleteWarehouse = async (warehouseId) => {
    try {
        await api.delete(`/warehouses/${warehouseId}`);
        return true;
    } catch (error) {
        console.error('Error deleting warehouse:', error);
        throw error;
    }
}; 
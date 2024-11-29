import api from '../utils/axios';

export const fetchWarehouses = async () => {
    try {
        console.log('Fetching warehouses...');
        const response = await api.get('/warehouses');
        console.log('Warehouses fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Detailed fetch error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

export const createWarehouse = async (warehouseData) => {
    try {
        console.log('Creating warehouse with data:', warehouseData);
        const response = await api.post('/warehouses', warehouseData);
        console.log('Warehouse creation response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Detailed create error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            data: warehouseData
        });
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
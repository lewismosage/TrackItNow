import api from '../utils/axios';

export const fetchSuppliers = async () => {
    try {
        console.log('Fetching suppliers...');
        const response = await api.get('/suppliers');
        console.log('Suppliers fetched:', response.data);
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

export const createSupplier = async (supplierData) => {
    try {
        console.log('Creating supplier with data:', supplierData);
        const response = await api.post('/suppliers', supplierData);
        console.log('Supplier created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Detailed create error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            data: supplierData
        });
        throw new Error(error.response?.data?.error || 'Failed to create supplier');
    }
};

export const updateSupplier = async (supplierId, supplierData) => {
    try {
        const response = await api.put(`/suppliers/${supplierId}`, supplierData);
        return response.data;
    } catch (error) {
        console.error('Error updating supplier:', error);
        throw error;
    }
};

export const deleteSupplier = async (supplierId) => {
    try {
        await api.delete(`/suppliers/${supplierId}`);
        return true;
    } catch (error) {
        console.error('Error deleting supplier:', error);
        throw error;
    }
}; 
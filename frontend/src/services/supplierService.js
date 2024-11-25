import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchSuppliers = async () => {
    try {
        console.log('Fetching suppliers...');
        const response = await axios.get(`${BASE_URL}/suppliers`);
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
        const response = await axios.post(`${BASE_URL}/suppliers`, supplierData);
        console.log('Supplier created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Detailed create error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

export const updateSupplier = async (supplierId, supplierData) => {
    try {
        const response = await axios.put(`${BASE_URL}/suppliers/${supplierId}`, supplierData);
        return response.data;
    } catch (error) {
        console.error('Error updating supplier:', error);
        throw error;
    }
};

export const deleteSupplier = async (supplierId) => {
    try {
        await axios.delete(`${BASE_URL}/suppliers/${supplierId}`);
        return true;
    } catch (error) {
        console.error('Error deleting supplier:', error);
        throw error;
    }
}; 
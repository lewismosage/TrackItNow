import api from '../utils/axios';

export const fetchCustomers = async () => {
    try {
        const response = await api.get('/customers');
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const createCustomer = async (customerData) => {
    try {
        const response = await api.post('/customers', customerData);
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

export const updateCustomer = async (customerId, customerData) => {
    try {
        const response = await api.put(`/customers/${customerId}`, customerData);
        return response.data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

export const deleteCustomer = async (customerId) => {
    try {
        await api.delete(`/customers/${customerId}`);
        return true;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
}; 
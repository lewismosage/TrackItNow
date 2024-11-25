import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchCustomers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const createCustomer = async (customerData) => {
    try {
        console.log('Sending customer data:', customerData);
        const response = await axios.post(`${BASE_URL}/customers`, customerData);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Detailed error:', {
            message: error.message,
            response: error.response?.data,
            data: error.response?.data
        });
        throw error;
    }
};

export const updateCustomer = async (customerId, customerData) => {
    try {
        const response = await axios.put(`${BASE_URL}/customers/${customerId}`, customerData);
        return response.data;
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

export const deleteCustomer = async (customerId) => {
    try {
        await axios.delete(`${BASE_URL}/customers/${customerId}`);
        return true;
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
}; 
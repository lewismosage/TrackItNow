import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Debug axios requests
axios.interceptors.request.use(request => {
    console.log('Starting Request:', request.method, request.url);
    return request;
});

export const fetchOrders = async () => {
    try {
        console.log('Fetching orders from:', `${BASE_URL}/orders`);
        const response = await axios.get(`${BASE_URL}/orders`);
        console.log('Orders response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Full error:', error);
        console.error('Error response:', error.response);
        throw new Error(error.response?.data?.error || 'Failed to fetch orders');
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${BASE_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        // Encode the order ID to handle special characters
        const encodedId = encodeURIComponent(orderId);
        console.log('Updating order:', orderId, orderData);
        const response = await axios.put(`${BASE_URL}/orders/${encodedId}`, orderData);
        console.log('Update response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error.response || error);
        throw new Error(error.response?.data?.error || 'Failed to update order');
    }
};

export const deleteOrder = async (orderId) => {
    try {
        // Encode the order ID to handle special characters
        const encodedId = encodeURIComponent(orderId);
        console.log('Deleting order:', orderId);
        const response = await axios.delete(`${BASE_URL}/orders/${encodedId}`);
        console.log('Delete response:', response.data);
        return true;
    } catch (error) {
        console.error('Error deleting order:', error.response || error);
        throw new Error(error.response?.data?.error || 'Failed to delete order');
    }
}; 
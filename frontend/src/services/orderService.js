import api from '../utils/axios';

export const fetchOrders = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Failed to fetch orders');
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
};

export const updateOrder = async (orderId, orderData) => {
    try {
        const encodedId = encodeURIComponent(orderId);
        console.log('Updating order:', orderId, orderData);
        const response = await api.put(`/orders/${encodedId}`, orderData);
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
        const response = await api.delete(`/orders/${encodedId}`);
        console.log('Delete response:', response.data);
        return true;
    } catch (error) {
        console.error('Error deleting order:', error.response || error);
        throw new Error(error.response?.data?.error || 'Failed to delete order');
    }
}; 
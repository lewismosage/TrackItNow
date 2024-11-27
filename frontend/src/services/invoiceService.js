import api from '../utils/axios';

export const fetchInvoices = async () => {
    try {
        const response = await api.get('/invoices');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to fetch invoices');
    }
};

export const createInvoice = async (newInvoice) => {
    try {
        console.log('Sending invoice data:', newInvoice);
        const response = await api.post('/invoices', newInvoice);
        return response.data;
    } catch (error) {
        console.error('Create invoice error:', error);
        throw new Error(error.response?.data?.error || 'Failed to create invoice');
    }
};

export const updateInvoice = async (id, updatedInvoice) => {
    try {
        const response = await api.put(`/invoices/${id}`, updatedInvoice);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Failed to update invoice');
    }
};

export const deleteInvoice = async (id) => {
    try {
        await api.delete(`/invoices/${id}`);
        return true;
    } catch (error) {
        throw new Error('Failed to delete invoice');
    }
}; 
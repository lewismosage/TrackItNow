import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchInvoices = async () => {
    try {
        const response = await fetch(`${BASE_URL}/invoices`, {
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch invoices');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const createInvoice = async (newInvoice) => {
    try {
        console.log('Sending invoice data:', newInvoice);

        const response = await fetch(`${BASE_URL}/invoices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newInvoice),
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error response:', errorData);
            throw new Error(errorData.error || 'Failed to create invoice');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Create invoice error:', error);
        throw error;
    }
};

export const updateInvoice = async (id, updatedInvoice) => {
    try {
        const response = await fetch(`${BASE_URL}/invoices/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedInvoice),
            credentials: 'include'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update invoice');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteInvoice = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/invoices/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete invoice');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}; 
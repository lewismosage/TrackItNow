import { config } from '../config';

// Export the function for production use
export const logInventoryActionProd = async (actionData) => {
    try {
        const response = await fetch(`${config.API_URL}/api/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...actionData,
                timestamp: new Date().toISOString(),
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in logInventoryAction:', error);
        throw new Error('Failed to log inventory action');
    }
};

// Export other history-related functions
export const fetchHistory = async () => {
    try {
        const response = await fetch(`${config.API_URL}/api/history`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching history:', error);
        throw new Error('Failed to fetch history');
    }
};

// Mock version for testing
export const logInventoryAction = async (actionData) => {
    return new Promise((resolve) => {
        console.log('Logging inventory action:', actionData);
        // Simulate API delay
        setTimeout(() => {
            resolve({
                success: true,
                data: actionData
            });
        }, 500);
    });
}; 
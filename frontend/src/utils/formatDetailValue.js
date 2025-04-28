export const formatValue = (key, value) => {
    if (value === null || value === undefined || value === '') {
        return 'Not specified';
    }

    if (key.includes('date') || key.includes('Date')) {
        return new Date(value).toLocaleDateString();
    }

    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }

    if (Array.isArray(value)) {
        return value.join(', ');
    }

    return value.toString();
};
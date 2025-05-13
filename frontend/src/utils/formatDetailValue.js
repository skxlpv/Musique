export const formatValue = (key, value) => {
    if (value === null || value === undefined || value === '') {
        return 'Not specified';
    }

    if (key.includes('uploaded_at')) {
        console.log(value);
        try {
            // Parse the date string
            const date = new Date(value);

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                return value; // Return original if invalid
            }

            // Format options for toLocaleString
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            };

            return date.toLocaleString(undefined, options);
            // Example output: "May 6, 2025, 11:03 AM GMT"
        } catch (e) {
            console.error('Error formatting date:', e);
            return value; // Return original value if formatting fails
        }
    }

    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }

    if (Array.isArray(value)) {
        return value.join(', ');
    }

    return value.toString();
};
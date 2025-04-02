const BASE_COLORS = {
    red: '#450a0a',      // red-950 equivalent
    blue: '#082f49',     // blue-950 equivalent
    green: '#052e16',    // green-950 equivalent
    purple: '#2e1065',   // purple-950 equivalent
    teal: '#042f2e',     // teal-950 equivalent
    pink: '#500724',     // pink-950 equivalent
};

// Function to generate a random color from the base colors
export const getRandomBaseColor = () => {
    const colorKeys = Object.keys(BASE_COLORS);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    return BASE_COLORS[colorKeys[randomIndex]];
};

// Function to convert hex to RGB
const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

// Function to convert RGB to hex
const rgbToHex = (r, g, b) => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Function to create dimmed versions of a color
export const createColorVariants = (baseColor) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return {};

    return {
        light: rgbToHex(
            Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * 0.7)),
            Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * 0.7)),
            Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * 0.7))
        ),
        main: baseColor,
        dark: rgbToHex(
            Math.floor(rgb.r * 0.7),
            Math.floor(rgb.g * 0.7),
            Math.floor(rgb.b * 0.7)
        )
    };
};

// Function to generate a consistent color based on a string input
// This ensures the same string always gets the same color
export const getConsistentColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colorKeys = Object.keys(BASE_COLORS);
    const index = Math.abs(hash) % colorKeys.length;
    return BASE_COLORS[colorKeys[index]];
};

// Function to get contrasting text color (black or white) for a background
export const getContrastTextColor = (backgroundColor) => {
    const rgb = hexToRgb(backgroundColor);
    if (!rgb) return '#000000';

    // Calculate luminance - standard formula for perceived brightness
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

    return luminance > 0.5 ? '#000000' : '#ffffff';
};

// Generate a color map for known categories
export const generateCategoryColorMap = (categories) => {
    const colorMap = {};

    categories.forEach(category => {
        colorMap[category] = createColorVariants(getConsistentColor(category));
    });

    return colorMap;
};
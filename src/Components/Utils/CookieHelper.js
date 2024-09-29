import Cookies from 'js-cookie';

// Set a cookie with an expiration of 7 days by default
export const setCookie = (name, value, options = { expires: 7 }) => {
    Cookies.set(name, value, options);
};

// Get a cookie
export const getCookie = (name) => {
    return Cookies.get(name);
};

// Remove a cookie
export const removeCookie = (name) => {
    Cookies.remove(name);
};

// Clear all cookies (if needed)
export const clearAllCookies = () => {
    Object.keys(Cookies.get()).forEach(cookie => {
        Cookies.remove(cookie);
    });
};

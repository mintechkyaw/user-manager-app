import axios from "axios";
import router from "../router";

// Register Function 
export const register = async (form) => {
    try {
        const response = await axios.post('api/register', form);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        RoleBasedRedirect();
    } catch (error) {
        console.log(error);
    }

};

// Login Function
export const login = async (form) => {
    try {
        const response = await axios.post('api/login', form);
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        RoleBasedRedirect();
    } catch (err) {
        if (err) {
            console.error(err.response.data.error);
            return err.response.data.message
        } else {
            console.error('An unknown error occurred');
        }
    }

};

// Logout Function
export const logout = async () => {
    try {
        await axios.post('api/logout')
        localStorage.removeItem('token')
        router.push('/login')
    } catch (err) {
        console.log('error occured: ' + err)
    }
}

// Auth Check Function
export const isAuthenticated = async () => {
    try {
        const response = await axios.get('api/user');
        return response.data.user !== null;
    } catch (error) {
        console.error(error.response.data.message);
        return false;
    }
};

// Role Check Function
export const roleCheck = async () => {
    try {
        const response = await axios.get('api/user');
        return response.data.role ?? null;
    } catch (error) {
        console.error(error.response.data.message);
        return null;
    }
};

const RoleBasedRedirect = async () => {
    try {
        const response = await axios.get('api/user');        
        switch (response.data.role) {
            case 'admin':
                router.replace({ name: 'dashboard' });
                break;
            case 'user':
                router.replace({ name: 'home' });
            default:
                break;
        }
    } catch (err) {
        console.error(err);
    }
}
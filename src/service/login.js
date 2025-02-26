import axios from 'axios';

const baseURL = import.meta.env.VITE_ENVIRONMENT_URL;

export const Getlogin = async (password, email)=>{
        const data = await axios.post(`${baseURL}/auth`,
        {
            email,
            password
        })
        return data.data
}

export const createUser = async (password, email, name)=>{
    const data = await axios.post(`${baseURL}/auth/new`,
    {
        name,
        email,
        password
    })
    return data.data
}
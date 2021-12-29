import axios from "axios"

export const handleLogin = (email, password) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/login', {
        email, password
    })
}

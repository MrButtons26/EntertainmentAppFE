import axios from "axios";

export default async function signUp({ username, email, password }) {
    try {
        const res = await axios.post(`http://localhost:3000/user/signup`, {
            userName: username,
            email: email,
            password: password,
        });

        return res.data;
    } catch (e) {
        throw new Error(e.response.data.data.error.errorResponse.code)
    }
}

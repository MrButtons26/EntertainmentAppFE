import axios from "axios";

export default async function login({ email, password }) {

    const res = await axios.post(`http://localhost:3000/user/login`, {
        email: email,
        password: password
    });
    if (res.status === 401) {
        throw new Error(`Incorrect Password or Email`)
    }
    return res.data;

}

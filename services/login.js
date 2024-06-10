import axios from "axios";

export default async function login({ username, email, password }) {
    try {
        const res = await axios.post(`http://localhost:3000/user/signup`, {
            userName: "askaht",
            email: "thpaliyal.skastht@gmail.com",
            password: "qwertyuiop",
        });

        return res.data;
    } catch (e) { }
}

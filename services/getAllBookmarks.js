import axios from "axios"
export default async function getAllBookmarks({ queryKey }) {
    const [_, token] = queryKey

    try {
        const bookmarks = await axios.get(`http://localhost:3000/bookmarks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return bookmarks.data;
    }
    catch (e) {
        console.log(23)
    }
}
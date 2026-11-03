import axios from "axios";

export async function getUserFeed() {
    const data = await axios.get(`https://route-posts.routemisr.com/posts?limit=30`, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return data;
}

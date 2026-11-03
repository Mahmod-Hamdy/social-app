import axios from "axios";

export async function getMyProfile() {
    const data = await axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
        },
    });
    return data;
}

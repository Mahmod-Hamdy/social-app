import axios from "axios";

export async function detailsOfPost(postId:string){
    const data = await axios.get(`https://route-posts.routemisr.com/posts/${postId}`,
    {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
    }
);
    return data;
}

export async function createPost(formData:FormData){
    const data = await axios.post(`https://route-posts.routemisr.com/posts`,
    formData,
        {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
    },
)
    return data;
}

export async function updatePost(postId:string,formData:FormData){
    const data = await axios.put(`https://route-posts.routemisr.com/posts/${postId}`,
    formData,
        {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
    },
)
    return data;
}
export async function deletePost(postId:string){
    const data = await axios.delete(`https://route-posts.routemisr.com/posts/${postId}`,
        {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
    },
)
    return data;
}
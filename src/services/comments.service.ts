import axios from "axios";

export async function getPostComments(postId:string){
    const data = await axios.get(`https://route-posts.routemisr.com/posts/${postId}/comments` ,
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
    }
    )
    return data
}

export async function createPostComment(postId:string,formData:FormData){
    const data = await axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`,
    formData,
        {
        headers: {
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`
        },
    },
)
    return data;
}
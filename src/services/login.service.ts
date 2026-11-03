import axios from 'axios';
import type { LoginValidationDataType } from './../lib/Schemas/Login.Schema';
const baseURL=import.meta.env.BASE_URL


export async function loginUser(formData: LoginValidationDataType){
    const data = await axios.post(`https://route-posts.routemisr.com/users/signin`,formData,{
        headers:
        {"Content-Type": "application/json"}
    })
    return data;
}

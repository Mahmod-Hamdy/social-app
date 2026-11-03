import axios from "axios";
import type { RegisterValidationDataType } from "../lib/Schemas/Auth.Schema";
const baseURL=import.meta.env.BASE_URL
// * calling api for Auth
export async function registerUser(formData: RegisterValidationDataType) {
    const data = await axios.post(`${baseURL}/users/signup`,formData,
        { headers: 
            { "Content-Type": "application/json" } 
        },
    );
    return data;
}

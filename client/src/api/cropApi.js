import { axiosInstance } from "./axiosInstance";


export const getCropListApi = async() => {
    try {
        const response = await axiosInstance.get("crop/get-crop-list");
        return response.data;
    } catch (error) {
        throw new Error(error.message || error);
    }
}
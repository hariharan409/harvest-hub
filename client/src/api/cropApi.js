import { axiosInstance } from "./axiosInstance";


const getCropListApi = async() => {
    try {
        const response = await axiosInstance.get("crop/get-crop-list");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const getCropByIdApi = async(_id) => {
    try {
        const response = await axiosInstance.get("crop/get-crop-by-id",{
            params: new URLSearchParams({_id: _id})
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const saveCropApi = async(formData) => {
    try {
        const response = await axiosInstance.post("crop/save-crop",formData);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

const deleteCropByIdApi = async(_id) => {
    try {
        const response = await axiosInstance.delete("crop/delete-crop-by-id",{
            params: new URLSearchParams({_id: _id})
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

export default {
    getCropListApi,
    getCropByIdApi,
    saveCropApi,
    deleteCropByIdApi
}
import { axiosInstance } from "./axiosInstance";


export const getCropRecordListApi = async() => {
    try {
        const response = await axiosInstance.get("crop-record/get-crop-record-list");
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

export const getCropRecordByIdApi = async(_id) => {
    try {
        const response = await axiosInstance.get("crop-record/get-crop-record-by-id",{
            params: new URLSearchParams({_id: _id})
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

export const saveCropRecordApi = async(formData) => {
    try {
        const response = await axiosInstance.post("crop-record/save-crop-record",formData);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}

export const deleteCropRecordByIdApi = async(_id) => {
    try {
        const response = await axiosInstance.delete("crop-record/delete-crop-record-by-id",{
            params: new URLSearchParams({_id: _id})
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data.message || error.message || error;
        throw new Error(errorMessage);
    }
}
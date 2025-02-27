import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCropById, getCropById, getCropList, saveCrop } from "../store/slices/cropSlice";


const useCrop = (_id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cropFormData = useSelector((state) => state.crop?.cropForm);
    const loadingFlags = useSelector((state) => state.crop?.loadingFlags);
    const cropList = useSelector((state) => state.crop.cropList);
    const {register,handleSubmit,setValue,watch,formState: {errors}} = useForm({
        // set initial values from redux store
        defaultValues: cropFormData 
    });

    // get crop list on component mount
    useEffect(() => {
        dispatch(getCropList());
    }, [dispatch]);

    useEffect(() => {
        if(_id) {
            dispatch(getCropById(_id));
        }
    }, [_id, dispatch]);

    useEffect(() => {
        if (cropFormData) {
            Object.entries(cropFormData).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [cropFormData, setValue]);

    const onSubmit = async(data) => {
        await dispatch(saveCrop(data));
        navigate(-1);
    };
    
    const onNavigate = (path,id) => {
        navigate(path+`/${id}`)
    }

    const onDeleteCrop = (id) => {
        dispatch(deleteCropById(id));
    }

    return {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        loadingFlags,
        onSubmit,
        cropList,
        onNavigate,
        onDeleteCrop
    };

}

export default useCrop;
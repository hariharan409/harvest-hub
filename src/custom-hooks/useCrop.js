import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCropByID, saveCropFormData, setCropFormData, setLoadingFlags } from "../store/slices/cropSlice";


const useCrop = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cropFormData = useSelector((state) => state.crop?.cropForm);
    const loadingFlags = useSelector((state) => state.crop?.loadingFlags);
    const {register,handleSubmit,setValue,watch,formState: {errors}} = useForm({
        // set initial values from redux store
        defaultValues: cropFormData 
    });

    useEffect(() => {
        if(id) {
            dispatch(getCropByID(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (cropFormData) {
            Object.entries(cropFormData).forEach(([key, value]) => {
                setValue(key, value);
            });
        }
    }, [cropFormData, setValue]);

    useEffect(() => {
        return () => {
            dispatch(setCropFormData({}));
        };
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(setLoadingFlags({ key: "isSaving", value: true }));
        dispatch(saveCropFormData(data));
        navigate(-1);
    };

    return {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        loadingFlags,
        onSubmit
    };

}

export default useCrop;
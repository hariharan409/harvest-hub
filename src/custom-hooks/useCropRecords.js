import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const useCropRecords = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loadingFlags = useSelector((state) => state.cropRecords?.loadingFlags);
    const {register,handleSubmit,setValue,watch,formState: {errors}} = useForm({
        // set initial values from redux store
        defaultValues: {
            cropID: null,
            plantingDate: null
        } 
    });
    
    const onSubmit = (data) => {
        console.log("enhancing bro",data);
        navigate(-1);
    };


    return {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        onSubmit,
        loadingFlags
    }
}

export default useCropRecords;
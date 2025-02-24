import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWorkRow,addExpenseRow } from "../store/slices/cropRecordsSlice";


const useCropRecords = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cropRecordsFormData = useSelector((state) => state.cropRecords?.cropRecordsForm);
    const loadingFlags = useSelector((state) => state.cropRecords?.loadingFlags);
    const {register,handleSubmit,setValue,watch,formState: {errors}} = useForm({
        // set initial values from redux store
        defaultValues: cropRecordsFormData
    });

    const onAddWork = () => {
        dispatch(addWorkRow());
    };

    const onAddExpense = (index) => {
        dispatch(addExpenseRow(index))
    }
    
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
        loadingFlags,
        onAddWork,
        onAddExpense,
        cropRecordsFormData
    }
}

export default useCropRecords;
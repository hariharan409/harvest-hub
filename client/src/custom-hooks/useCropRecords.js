import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWorkRow,addExpenseRow,removeWorkRow,removeExpenseRow, getCropRecordsByID, setCropRecordsFormData, setLoadingFlags, saveCropRecordsFormData, setEmptyCropRecords, deleteCropRecordsById } from "../store/slices/cropRecordsSlice";


const useCropRecords = (id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cropRecordsFormData = useSelector((state) => state.cropRecords?.cropRecordsForm);
    const cropRecordsList = useSelector((state) => state.cropRecords?.cropRecordsList);
    const loadingFlags = useSelector((state) => state.cropRecords?.loadingFlags);
    const {register,handleSubmit,setValue,watch,formState: {errors}} = useForm({
        // set initial values from redux store
        defaultValues: cropRecordsFormData
    });

    useEffect(() => {
        if(id) {
            dispatch(getCropRecordsByID(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if(cropRecordsFormData) {
            Object.entries(cropRecordsFormData).forEach(([key,value]) => {
                setValue(key,value);
            });
        }
    },[cropRecordsFormData,setValue]);

    useEffect(() => {
        return () => {
            dispatch(setEmptyCropRecords());
        };
    }, [dispatch]);

    const onAddWork = () => {
        dispatch(addWorkRow());
    };

    const onRemoveWork = (workIndex) => {
        dispatch(removeWorkRow({workIndex}));
    }

    const onAddExpense = (index) => {
        dispatch(addExpenseRow(index))
    }

    const onRemoveExpense = (workIndex,expenseIndex) => {
        dispatch(removeExpenseRow({workIndex,expenseIndex}));
    }
    
    const onSubmit = (data) => {
        dispatch(setLoadingFlags({ key: "isSaving", value: true }));
        dispatch(saveCropRecordsFormData(data));
        navigate(-1);
    };

    const onNavigate = (path,id) => {
        navigate(path+`/${id}`)
    }

    const onDeleteCropRecords = (id) => {
        dispatch(deleteCropRecordsById(id));
    }


    return {
        register,
        handleSubmit,
        setValue,
        watch,
        errors,
        onSubmit,
        loadingFlags,
        onAddWork,
        onRemoveWork,
        onAddExpense,
        onRemoveExpense,
        cropRecordsFormData,
        cropRecordsList,
        onNavigate,
        onDeleteCropRecords
    }
}

export default useCropRecords;
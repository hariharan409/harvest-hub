import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWorkRow,addExpenseRow,removeWorkRow,removeExpenseRow, getCropRecordList, getCropRecordById, saveCropRecord, deleteCropRecordById,refreshCropRecordForm,changeStatusType } from "../store/slices/cropRecordsSlice";


const useCropRecords = (_id) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cropRecordsFormData = useSelector((state) => state.cropRecords?.cropRecordsForm);
    const cropRecordsList = useSelector((state) => state.cropRecords?.cropRecordsList);
    const loadingFlags = useSelector((state) => state.cropRecords?.loadingFlags);
    const statusType = useSelector((state) => state.cropRecords?.statusType);
    const {register,handleSubmit,setValue,watch,formState: {errors}} = useForm({
        // set initial values from redux store
        defaultValues: cropRecordsFormData
    });

    // get crop record list on component mount
    useEffect(() => {
        const initialStatus = "planted";
        dispatch(getCropRecordList(initialStatus));
    }, [dispatch]);

    useEffect(() => {
        if(_id) {
            dispatch(getCropRecordById(_id));
        }
    }, [_id, dispatch]);

    useEffect(() => {
        if(cropRecordsFormData && _id) {
            Object.entries(cropRecordsFormData).forEach(([key,value]) => {
                setValue(key,value);
            });
        }
    },[cropRecordsFormData,setValue]);

    useEffect(() => {
        return () => dispatch(refreshCropRecordForm());
    },[]);

    /* crop record table list data change depends on the status */
    const onStatusChange = (status) => {
        dispatch(getCropRecordList(status));
        dispatch(changeStatusType(status));
    }

    const onSubmit = async(data) => {  
        const response = await dispatch(saveCropRecord(data));
        if(saveCropRecord.fulfilled.match(response)) {
            navigate(-1);
        }
    };

    const onDeleteCropRecords = (id) => {
        dispatch(deleteCropRecordById(id));
    }

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

    const onNavigate = (path,id) => {
        navigate(path+`/${id}`)
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
        onDeleteCropRecords,
        onStatusChange,
        statusType
    }
}

export default useCropRecords;
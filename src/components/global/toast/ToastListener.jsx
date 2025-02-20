import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { clearToast } from "../../../store/slices/toastSlice";


const ToastListener = () => {
    const dispatch = useDispatch();
    const {message,type} = useSelector((state) => state.toast);

    useEffect(() => {
        if(message) {
            if (type === 'success') toast.success(message);
            if (type === 'error')   toast.error(message);
            if (type === 'info')    toast.info(message);

            // automatically clear the toast message after it's displayed
            dispatch(clearToast());
        }
    },[message, type, dispatch]);

    return null; // no ui needed
}

export default ToastListener;
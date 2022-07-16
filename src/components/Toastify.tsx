import React from 'react';
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function toastError(message:string) {
    return toast.error(message, {
        toastId: 'error1',
    });
}

export function toastSuccess(message:string) {
    return toast.success(message, {
        toastId: 'success1',
    });
}

export function toastInfo(message:string) {
    return toast.info(message, {
        toastId: 'info1',
    });
}

export function toastWarning(message:string) {
    return toast.warning(message, {
        toastId: 'warning1',
    });
}

function Toastify() {
    return (
        <ToastContainer />
    );
}

export default Toastify;
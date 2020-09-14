import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Notification(text, isError){

    const notificationStyle = {
        position: "bottom-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    }

    if(isError){
        toast.error(`😢 ${text}`, {notificationStyle});
    }
    else {
        toast(`🤞 ${text}`, {notificationStyle});
    }
    
}

export default Notification;
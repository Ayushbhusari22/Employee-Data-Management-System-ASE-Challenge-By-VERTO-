import { useEffect } from "react";
import { Check, AlertCircle, X } from "lucide-react";

function Alert ({ type, message, onClose }) {
    useEffect(() => {
        if (message) {
            const t = setTimeout(() => onClose(), 3000);
            return () => clearTimeout(t);
        }
    }, [message, onClose]);

    if(!message) return null;

    const styles = type === "success"
        ? "bg-green-100 border-green-400 text-green-700"
        : "bg-red-100 border-red-400 text-red-700";

    const Icon = type === "success" ? Check: AlertCircle;

    return (
        <div className={`mb-4 px-4 py-3 border rounded-lg flex justify-between items-center gap-2 ${styles}`}>
            <Icon className="w-5 h-5" />
            {message}
            <button onClick={onClose} className="ml-4">
                <X size={18} />
            </button>
        </div>
    );

}

export default Alert;
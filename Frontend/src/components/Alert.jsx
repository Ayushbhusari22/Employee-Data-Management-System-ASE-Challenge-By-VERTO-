import React, { useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";

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
        <div className={`mb-4 p-3 border rounded flex items-center gap-2 ${styles}`}>
            <Icon className="w-5 h-5" />
            {message}
        </div>
    );

}

export default Alert;
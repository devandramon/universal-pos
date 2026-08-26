import type {
    InputHTMLAttributes,
} from "react";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

function Input({
    label,
    error,
    className = "",
    ...props
}: InputProps) {
    return (
        <div className="space-y-1.5">

            {label && (
                <label
                    htmlFor={props.id}
                    className="block text-sm font-medium text-slate-700"
                >
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${
                    error
                        ? "border-red-400"
                        : "border-slate-300"
                } ${className}`}
            />

            {error && (
                <p className="text-xs text-red-600">
                    {error}
                </p>
            )}

        </div>
    );
}

export default Input;
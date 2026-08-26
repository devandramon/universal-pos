import type {
    SelectHTMLAttributes,
    ReactNode,
} from "react";

interface SelectProps
    extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    children: ReactNode;
}

function Select({
    label,
    error,
    children,
    className = "",
    ...props
}: SelectProps) {
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

            <select
                {...props}
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 ${
                    error
                        ? "border-red-400"
                        : "border-slate-300"
                } ${className}`}
            >
                {children}
            </select>

            {error && (
                <p className="text-xs text-red-600">
                    {error}
                </p>
            )}

        </div>
    );
}

export default Select;
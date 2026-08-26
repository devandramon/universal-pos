import type {
    ButtonHTMLAttributes,
    ReactNode,
} from "react";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    loading?: boolean;
}

function Button({
    children,
    variant = "primary",
    loading = false,
    disabled,
    className = "",
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            "bg-slate-900 text-white hover:bg-slate-800",
        secondary:
            "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
        danger:
            "bg-red-600 text-white hover:bg-red-700",
        ghost:
            "text-slate-600 hover:bg-slate-100",
    };

    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
        >
            {loading ? "Processing..." : children}
        </button>
    );
}

export default Button;
import type {
    ReactNode,
} from "react";

interface BadgeProps {
    children: ReactNode;
    variant?:
        | "default"
        | "success"
        | "warning"
        | "danger";
}

function Badge({
    children,
    variant = "default",
}: BadgeProps) {
    const styles = {
        default:
            "bg-slate-100 text-slate-700",
        success:
            "bg-green-50 text-green-700",
        warning:
            "bg-yellow-50 text-yellow-700",
        danger:
            "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[variant]}`}
        >
            {children}
        </span>
    );
}

export default Badge;
import type {
    ReactNode,
} from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

function Modal({
    open,
    onClose,
    title,
    children,
}: ModalProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">

            <button
                type="button"
                aria-label="Close modal"
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40"
            />

            <div className="relative w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:max-w-lg sm:rounded-2xl sm:p-6">

                <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-lg font-semibold text-slate-900">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-2.5 py-1.5 text-slate-500 hover:bg-slate-100"
                    >
                        ✕
                    </button>

                </div>

                {children}

            </div>

        </div>
    );
}

export default Modal;
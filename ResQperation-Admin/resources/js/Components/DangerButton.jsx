export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-[1.5rem] bg-critical px-6 py-5 text-base font-semibold uppercase tracking-[0.05em] text-white transition duration-200 ease-out hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-critical/20 disabled:opacity-50 ${
                    disabled && 'pointer-events-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

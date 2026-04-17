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
<<<<<<< HEAD
                `inline-flex items-center justify-center rounded-[1.5rem] bg-critical px-6 py-5 text-base font-semibold uppercase tracking-[0.05em] text-white transition duration-200 ease-out hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-critical/20 disabled:opacity-50 ${
                    disabled && 'pointer-events-none'
=======
                `inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${
                    disabled && 'opacity-25'
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

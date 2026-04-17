export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
<<<<<<< HEAD
                `inline-flex items-center justify-center rounded-[1.5rem] bg-transparent px-5 py-5 text-base font-semibold uppercase tracking-[0.05em] text-on-surface transition duration-200 ease-out hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-40 ${
                    disabled && 'pointer-events-none'
=======
                `inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${
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

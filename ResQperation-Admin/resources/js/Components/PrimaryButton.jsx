export default function PrimaryButton({
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
                `inline-flex items-center justify-center rounded-[1.5rem] bg-primary px-6 py-5 text-base font-semibold text-white shadow-ambient transition duration-200 ease-out hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 ${
                    disabled && 'pointer-events-none'
=======
                `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${
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

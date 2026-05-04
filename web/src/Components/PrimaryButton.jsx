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
                `inline-flex items-center justify-center rounded-[1.5rem] bg-primary px-6 py-5 text-base font-semibold text-white shadow-ambient transition duration-200 ease-out hover:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 ` +
                (disabled ? 'pointer-events-none' : '') +
                ' ' + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

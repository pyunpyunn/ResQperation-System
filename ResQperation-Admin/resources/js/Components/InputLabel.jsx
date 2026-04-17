export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
<<<<<<< HEAD
                `block text-label-md font-semibold uppercase tracking-[0.05em] text-on-surface ` +
=======
                `block text-sm font-medium text-gray-700 ` +
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                className
            }
        >
            {value ? value : children}
        </label>
    );
}

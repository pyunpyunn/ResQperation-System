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
                `block text-label-md font-semibold uppercase tracking-[0.05em] text-on-surface ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}

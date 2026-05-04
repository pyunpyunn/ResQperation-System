export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-surface-container-high text-primary shadow-ambient focus:ring-primary/40 ' +
                className
            }
        />
    );
}

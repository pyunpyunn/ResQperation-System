export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
<<<<<<< HEAD
                'rounded border-surface-container-high text-primary shadow-ambient focus:ring-primary/40 ' +
=======
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                className
            }
        />
    );
}

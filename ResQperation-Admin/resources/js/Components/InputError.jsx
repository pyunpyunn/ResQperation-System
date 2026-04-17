export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
<<<<<<< HEAD
            className={'text-base text-critical ' + className}
=======
            className={'text-sm text-red-600 ' + className}
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
        >
            {message}
        </p>
    ) : null;
}

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-base text-critical ' + className}
        >
            {message}
        </p>
    ) : null;
}

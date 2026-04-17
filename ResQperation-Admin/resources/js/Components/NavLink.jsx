import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
<<<<<<< HEAD
                'inline-flex items-center px-1 pt-1 text-base font-semibold tracking-[0.02em] transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-on-surface'
                    : 'text-on-surface/80 hover:text-on-surface') +
=======
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700') +
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                className
            }
        >
            {children}
        </Link>
    );
}

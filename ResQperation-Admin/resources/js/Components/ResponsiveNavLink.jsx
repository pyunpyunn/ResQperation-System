import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
<<<<<<< HEAD
            className={`flex w-full items-start rounded-[1.5rem] px-4 py-3 ${
                active
                    ? 'bg-surface-container-lowest text-on-surface'
                    : 'bg-surface-container-low text-on-surface/80 hover:bg-surface-container-lowest hover:text-on-surface'
=======
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800'
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

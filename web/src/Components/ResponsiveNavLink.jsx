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
            className={`flex w-full items-start rounded-[1.5rem] px-4 py-3 ${
                active
                    ? 'bg-surface-container-lowest text-on-surface'
                    : 'bg-surface-container-low text-on-surface/80 hover:bg-surface-container-lowest hover:text-on-surface'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}

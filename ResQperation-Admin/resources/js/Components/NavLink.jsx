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
                'inline-flex items-center px-1 pt-1 text-base font-semibold tracking-[0.02em] transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-on-surface'
                    : 'text-on-surface/80 hover:text-on-surface') +
                className
            }
        >
            {children}
        </Link>
    );
}

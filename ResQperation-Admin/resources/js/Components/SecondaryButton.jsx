export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center justify-center rounded-[1.5rem] bg-transparent px-5 py-5 text-base font-semibold uppercase tracking-[0.05em] text-on-surface transition duration-200 ease-out hover:text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-40 ` +
                (disabled ? 'pointer-events-none' : '') +
                ' ' + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

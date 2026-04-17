import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'block w-full rounded-[1.5rem] bg-surface-container-lowest px-4 py-3 text-base text-on-surface shadow-[inset_0_0_0_1px_rgba(25,28,30,0.05)] transition duration-200 ease-out placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-primary/10 ' +
                className
            }
            ref={localRef}
        />
    );
});

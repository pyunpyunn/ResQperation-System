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
<<<<<<< HEAD
                'block w-full rounded-[1.5rem] bg-surface-container-lowest px-4 py-3 text-base text-on-surface shadow-[inset_0_0_0_1px_rgba(25,28,30,0.05)] transition duration-200 ease-out placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-primary/10 ' +
=======
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                className
            }
            ref={localRef}
        />
    );
});

import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                surface: 'var(--color-surface, #F7F9FB)',
                'surface-container-low': 'var(--color-surface-container-low, #F2F4F6)',
                'surface-container-lowest': 'var(--color-surface-container-lowest, #FFFFFF)',
                'surface-container-high': 'var(--color-surface-container-high, #E6E8EA)',
                'on-surface': 'var(--color-on-surface, #191C1E)',
                primary: 'var(--color-primary, #000000)',
                'primary-container': 'var(--color-primary-container, #111C2D)',
                safe: '#10B981',
                critical: '#EF4444',
                evacuate: '#F59E0B',
            },
            boxShadow: {
                ambient: '0 40px 40px -5px rgba(25,28,30,0.06)',
            },
            borderRadius: {
                xl: '1.5rem',
            },
            fontSize: {
                'display-lg': ['3.5rem', {
                    lineHeight: '1',
                    fontWeight: '700',
                    letterSpacing: '-0.02em',
                }],
                'headline-lg': ['2rem', {
                    lineHeight: '1.1',
                    fontWeight: '700',
                }],
                'headline-md': ['1.75rem', {
                    lineHeight: '1.15',
                    fontWeight: '700',
                }],
                'title-lg': ['1.25rem', {
                    lineHeight: '1.4',
                    fontWeight: '600',
                }],
                'title-md': ['1rem', {
                    lineHeight: '1.5',
                    fontWeight: '600',
                }],
                'body-lg': ['1rem', {
                    lineHeight: '1.5',
                    fontWeight: '400',
                }],
                'body-md': ['0.875rem', {
                    lineHeight: '1.43',
                    fontWeight: '400',
                }],
                'label-lg': ['0.875rem', {
                    lineHeight: '1.43',
                    fontWeight: '500',
                }],
        },
    },

    },

    plugins: [
        forms,
    ],
};

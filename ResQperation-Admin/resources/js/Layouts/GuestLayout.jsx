import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <header className="border-b border-surface-container-high bg-surface/95 px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10 text-on-surface" />
                        <span className="text-lg font-semibold">ResQperation</span>
                    </Link>
                </div>
            </header>

            <main className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-[1.5rem] bg-surface-container-low p-8 shadow-ambient">
                    {children}
                </div>
            </main>

            <footer className="border-t border-surface-container-high bg-surface-container-low py-6 px-4 text-center text-sm text-on-surface/80 sm:px-6 lg:px-8">
                <p>ResQperation HQ Portal — secure admin access for disaster coordination.</p>
            </footer>
        </div>
    );
}

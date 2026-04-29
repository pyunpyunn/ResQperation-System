import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ children, header }) {
    const user = usePage().props.auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const roleLabel = user?.role === 'super_admin' ? 'Super Admin' : 'HQ Admin';
    const portalLabel = user?.role === 'super_admin' ? 'Access Oversight Console' : 'HQ Operations Console';

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = user?.role === 'super_admin'
        ? [
            { name: 'Overview', href: route('super-admin.dashboard'), route: 'super-admin.dashboard', key: 'super-admin-dashboard', icon: 'shield', group: 'main' },
            { name: 'All Accounts', href: route('super-admin.accounts'), route: 'super-admin.accounts', key: 'super-admin-accounts', icon: 'accounts', group: 'oversight' },
        ]
        : [
            { name: 'Dashboard', href: route('dashboard'), route: 'dashboard', key: 'dashboard', icon: 'dashboard', group: 'main' },
            { name: 'Disaster Tracking', href: route('disasters.index'), route: 'disasters.index', key: 'disasters', icon: 'disasters', group: 'operations' },
            { name: 'Responders', href: route('responders.index'), route: 'responders.index', key: 'responders', icon: 'responders', group: 'resources' },
            { name: 'Households', href: route('households.index'), route: 'households.index', key: 'households', icon: 'households', group: 'resources' },
            { name: 'Requests', href: route('requests.index'), route: 'requests.index', key: 'requests', icon: 'requests', group: 'operations' },
            { name: 'Responder Accounts', href: route('accounts.index'), route: 'accounts.index', key: 'accounts', icon: 'accounts', group: 'resources' },
        ];

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface px-6 text-on-surface">
                <div className="max-w-md rounded-[1.5rem] bg-surface-container-low p-8 text-center shadow-ambient">
                    <h1 className="text-xl font-semibold">Loading secure session</h1>
                    <p className="mt-3 text-sm text-on-surface/75">
                        Your authenticated user profile is still being resolved. Please refresh the page if this message stays visible.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-surface text-on-surface">
            <header className="sticky top-0 z-40 border-b border-surface-container-high/20 bg-surface backdrop-blur-sm shadow-ambient">
                <div className="mx-auto flex max-w-full items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10 text-on-surface" />
                        <div className="hidden sm:block">
                            <span className="block text-lg font-semibold tracking-tight text-on-surface">
                                ResQperation Command Center
                            </span>
                            <span className="block text-xs uppercase tracking-[0.2em] text-on-surface/60">
                                {portalLabel}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1" />

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low text-on-surface transition-colors hover:bg-surface-container-high lg:hidden"
                        title={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                            <p className="text-xs text-on-surface/60">
                                {roleLabel} | ID {user.login_id}
                            </p>
                        </div>
                        <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary sm:inline-flex">
                            {roleLabel}
                        </span>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex h-11 items-center rounded-xl bg-primary-container px-4 text-sm font-semibold text-surface transition hover:bg-primary-container/90 focus:outline-none focus:ring-2 focus:ring-primary-container/25">
                                    Menu
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <Sidebar
                    isMobile={false}
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                    navItems={navItems}
                />

                <Sidebar
                    isMobile={true}
                    isOpen={mobileMenuOpen}
                    onToggle={() => setMobileMenuOpen(false)}
                    onMobileClose={() => setMobileMenuOpen(false)}
                    navItems={navItems}
                />

                <main className="flex-1 overflow-y-auto bg-surface">
                    {header && (
                        <div className="border-b border-surface-container-high/20 bg-surface">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </div>
                    )}
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

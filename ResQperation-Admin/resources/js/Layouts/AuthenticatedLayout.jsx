import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ children, header }) {
    const user = usePage().props.auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { name: 'Dashboard', href: route('dashboard'), route: 'dashboard', key: 'dashboard', icon: 'dashboard', group: 'main' },
        { name: 'Disaster Tracking', href: route('disasters.index'), route: 'disasters.index', key: 'disasters', icon: 'disasters', group: 'operations' },
        { name: 'Responders', href: route('responders.index'), route: 'responders.index', key: 'responders', icon: 'responders', group: 'resources' },
        { name: 'Households', href: route('households.index'), route: 'households.index', key: 'households', icon: 'households', group: 'resources' },
        { name: 'Requests', href: route('requests.index'), route: 'requests.index', key: 'requests', icon: 'requests', group: 'operations' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-surface dark:bg-surface-container-low text-on-surface dark:text-on-surface">
            {/* Fixed Header */}
            <header className="sticky top-0 z-40 bg-surface dark:bg-surface-container-low/95 backdrop-blur-sm shadow-ambient border-b border-surface-container-high/20 dark:border-surface-container-high/20">
                <div className="mx-auto flex max-w-full items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    {/* Logo and Branding */}
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10 text-on-surface dark:text-on-surface" />
                        <span className="hidden sm:inline text-lg font-semibold tracking-tight text-on-surface dark:text-on-surface">
                            ResQperation HQ
                        </span>
                    </div>

                    <div className="flex-1" />

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-low dark:bg-surface-container-high text-on-surface dark:text-on-surface hover:bg-surface-container-high dark:hover:bg-surface-container-high transition-colors"
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

                    {/* Account Menu */}
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-on-surface dark:text-on-surface">{user.name}</p>
                            <p className="text-xs text-on-surface/60 dark:text-on-surface/60">{user.email}</p>
                        </div>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex h-11 items-center rounded-xl bg-primary-container dark:bg-primary-container px-4 text-sm font-semibold text-surface dark:text-surface transition hover:bg-primary-container/90 dark:hover:bg-primary-container/90 focus:outline-none focus:ring-2 focus:ring-primary-container/25 dark:focus:ring-primary-container/25">
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

            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Sidebar */}
                <Sidebar
                    isMobile={false}
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen(!sidebarOpen)}
                    navItems={navItems}
                />

                {/* Mobile Sidebar */}
                <Sidebar
                    isMobile={true}
                    isOpen={mobileMenuOpen}
                    onToggle={() => setMobileMenuOpen(false)}
                    onMobileClose={() => setMobileMenuOpen(false)}
                    navItems={navItems}
                />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-surface dark:bg-surface-container-low">
                    {header && (
                        <div className="bg-surface dark:bg-surface-container-low border-b border-surface-container-high/20 dark:border-surface-container-high/20">
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


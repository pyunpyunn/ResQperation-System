import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
<<<<<<< HEAD
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navGroups = [
    {
        title: 'Overview',
        items: [
            {
                name: 'Dashboard',
                href: route('dashboard'),
                route: 'dashboard',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </svg>
                ),
            },
        ],
    },
    {
        title: 'Command',
        items: [
            {
                name: 'Incidents',
                href: route('disasters.index'),
                route: 'disasters.index',
                badge: 2,
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C7.58 2 4 5.58 4 10s8 12 8 12 8-7.58 8-12-3.58-8-8-8zm0 11.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                    </svg>
                ),
            },
            {
                name: 'Dispatch & routing',
                href: route('dispatch.index'),
                route: 'dispatch.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 8.25V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.25l4 2V6.25l-4 2z" />
                    </svg>
                ),
            },
            {
                name: 'SitRep & escalation',
                href: route('sitrep.index'),
                route: 'sitrep.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 3h12a2 2 0 0 1 2 2v3H4V5a2 2 0 0 1 2-2z" />
                        <path d="M4 10h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9z" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                ),
            },
            {
                name: 'HQ live map',
                href: route('map.index'),
                route: 'map.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 1.5L9 2.5L13 1V10.5L9 12L5 11L1 12.5V3L5 1.5Z" />
                        <path d="M5 1.5V11M9 2.5V12" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                ),
            },
        ],
    },
    {
        title: 'Awareness',
        items: [
            {
                name: 'Households',
                href: route('households.index'),
                route: 'households.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                ),
            },
            {
                name: 'Responders',
                href: route('responders.index'),
                route: 'responders.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="7" r="3" />
                        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                ),
            },
        ],
    },
    {
        title: 'Communications',
        items: [
            {
                name: 'Alerts & broadcast',
                href: route('alerts.index'),
                route: 'alerts.index',
                badge: '!',
                badgeClass: 'bg-warning-container text-warning',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9V14.5L3 16.5V18h18v-1.5L19 14.5V9c0-3.87-3.13-7-7-7z" />
                        <path d="M11.5 19h1v1.5h-1z" />
                    </svg>
                ),
            },
            {
                name: 'Requests',
                href: route('requests.index'),
                route: 'requests.index',
                badge: 5,
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 8h14v-2H7v2zm0-4h14v-2H7v2zm0-6v2h14V5H7z" />
                    </svg>
                ),
            },
            {
                name: 'Resources & evac',
                href: route('resources.index'),
                route: 'resources.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="4" y="6" width="16" height="12" rx="2" />
                        <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                ),
            },
        ],
    },
    {
        title: 'System',
        items: [
            {
                name: 'Accounts',
                href: route('accounts.index'),
                route: 'accounts.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="8" cy="7" r="2" />
                        <path d="M2 21c0-4 3-7 7-7s7 3 7 7" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M16 8v8l3 3" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                ),
            },
            {
                name: 'Archives',
                href: route('archives.index'),
                route: 'archives.index',
                icon: (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 4h16v4H4z" />
                        <path d="M3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8" fill="none" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 13h8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                ),
            },
        ],
    },
];

// Tooltip component for sidebar
function Tooltip({ text, children, isVisible }) {
    if (!isVisible) return children;
    return (
        <div className="group relative inline-flex">
            {children}
            <div className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-primary-container px-3 py-2 text-sm font-medium text-surface opacity-0 transition-opacity group-hover:opacity-100 z-50">
                {text}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-primary-container" />
            </div>
        </div>
    );
}

// Nav link component for sidebar
function SidebarLink({ item, isActive, sidebarOpen }) {
    return (
        <Tooltip text={item.name} isVisible={!sidebarOpen}>
            <Link
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                    isActive
                        ? 'bg-primary-container text-surface'
                        : 'text-on-surface hover:bg-surface-container-high hover:text-primary-container'
                }`}
            >
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
                    {item.icon}
                </span>
                {sidebarOpen && <span className="text-sm">{item.name}</span>}
                {item.badge ? (
                    <span className={`ml-auto rounded-full px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide ${item.badgeClass ?? 'bg-critical/10 text-critical'}`}>
                        {item.badge}
                    </span>
                ) : null}
            </Link>
        </Tooltip>
    );
}

export default function AuthenticatedLayout({ children, header, tabs, tabRoute, tabRouteParams = {}, showDisasterBar = false }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pageUrl = typeof window !== 'undefined' ? new URL(usePage().url, window.location.origin) : null;
    const currentTabKey = pageUrl?.searchParams.get('tab');
    const activeTab = tabs?.find((tab) => tab.key === currentTabKey) || tabs?.[0];

    return (
        <div className="min-h-screen flex flex-col bg-surface text-on-surface">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm shadow-ambient">
                <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10 text-on-surface" />
                        <span className="text-lg font-semibold tracking-tight text-on-surface">
                            ResQperation
                        </span>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-on-surface">{user.name}</p>
                            <p className="text-xs text-on-surface/80">{user.email}</p>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="inline-flex h-11 items-center rounded-2xl bg-primary-container px-4 text-sm font-semibold text-surface transition hover:bg-primary-container/90 focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </header>

            {/* Mobile navigation button */}
            <div className="lg:hidden bg-surface px-4 py-3">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-0 sm:px-6 lg:px-8">
                    <span className="text-sm font-semibold text-on-surface">Navigation</span>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-low text-on-surface transition hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                        title={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {mobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="lg:hidden bg-surface-container-low px-6 py-4">
                    <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                        {navGroups.map((group) => (
                            <div key={group.title}>
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-on-surface/80">
                                    {group.title}
                                </p>
                                <div className="space-y-2 mt-2">
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.route}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition ${
                                                route().current(item.route)
                                                    ? 'bg-primary-container text-surface'
                                                    : 'text-on-surface hover:bg-surface-container-high'
                                            }`}
                                        >
                                            <span className="h-5 w-5">{item.icon}</span>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="h-px bg-surface-container-high/20 my-2" />
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center justify-center rounded-lg bg-critical/10 px-4 py-2 text-sm font-semibold text-critical transition hover:bg-critical/20"
                        >
                            Log Out
                        </Link>
                    </div>
                </nav>
            )}

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Desktop */}
                <aside
                    className={`hidden lg:flex flex-col transition-all duration-300 ease-in-out bg-surface-container-low overflow-y-auto ${
                        sidebarOpen ? 'w-72' : 'w-20'
                    }`}
                >
                    {/* Sidebar Header */}
                    <div className="flex-shrink-0 px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-xs font-semibold uppercase tracking-wider text-on-surface/80">
                                {sidebarOpen ? 'Menu' : ''}
                            </div>
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-container-low text-on-surface transition hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary-container/25"
                                title={sidebarOpen ? 'Collapse menu' : 'Expand menu'}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {sidebarOpen ? (
                                        <path d="M15 6l-6 6 6 6" />
                                    ) : (
                                        <path d="M9 6l6 6-6 6" />
                                    )}
=======
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
                                </svg>
                            </button>
                        </div>
                    </div>
<<<<<<< HEAD

                    {/* Navigation Items */}
                    <nav className="flex-1 space-y-4 px-3 pb-6">
                        {navGroups.map((group) => (
                            <div key={group.title} className="space-y-2">
                                <div className="text-xs font-semibold uppercase tracking-wider text-on-surface/80 px-3">
                                    {sidebarOpen ? group.title : ' '}
                                </div>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <SidebarLink
                                            key={item.route}
                                            item={item}
                                            isActive={route().current(item.route)}
                                            sidebarOpen={sidebarOpen}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="flex-shrink-0 p-3">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high transition ${
                                        sidebarOpen ? '' : 'justify-center'
                                    }`}
                                    title="Settings"
                                >
                                    <svg
                                        className="h-5 w-5 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.64l-1.92-3.32c-.12-.22-.39-.3-.61-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.09-.49 0-.61.22L2.74 8.87c-.12.22-.07.49.12.64l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.64l1.92 3.32c.12.22.39.3.61.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.09.49 0 .61-.22l1.92-3.32c.12-.22.07-.49-.12-.64l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                                    </svg>
                                    {sidebarOpen && <span>Settings</span>}
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile Settings
                                </Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col overflow-y-auto text-on-surface">
                    <div className="flex-1 overflow-hidden">
                        <div className="max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
                            <div className="space-y-6">
                                {showDisasterBar && (
                                    <div className="rounded-[1.5rem] bg-critical text-surface p-4 font-medium shadow-ambient border border-critical/20">
                                        <div className="flex items-center gap-3">
                                            <span className="h-2 w-2 rounded-full bg-surface" />
                                            Active disaster event: Typhoon Carina — Purok 4 &amp; Sitio Mapayapa
                                        </div>
                                    </div>
                                )}
                                <div className="rounded-[1.5rem] bg-surface-container-lowest p-6 sm:p-8 shadow-ambient">
                                    <div className="space-y-6">
                                        {header && <div className="space-y-3">{header}</div>}
                                        {tabs?.length ? (
                                            <div className="flex flex-wrap gap-3">
                                                {tabs.map((tab) => (
                                                    <Link
                                                        key={tab.key}
                                                        href={route(tabRoute, { ...tabRouteParams, tab: tab.key })}
                                                        className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                            activeTab?.key === tab.key
                                                                ? 'bg-primary-container text-surface'
                                                                : 'bg-surface-container-high text-on-surface/80 hover:bg-surface-container-high/90'
                                                        }`}
                                                    >
                                                        {tab.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="rounded-[1.5rem] bg-surface-container-lowest p-6 sm:p-8 shadow-ambient">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="flex-shrink-0 bg-surface-container-low">
                        <div className="mx-auto max-w-7xl w-full px-4 py-4 sm:px-6 lg:px-8 text-center text-sm text-on-surface/80">
                            <p>
                                ResQperation HQ Portal — Disaster coordination and rescue management system
                            </p>
                        </div>
                    </footer>
                </main>
            </div>
=======
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
>>>>>>> b493ebc9962248d022f06b14238e791f9ad4bcbc
        </div>
    );
}

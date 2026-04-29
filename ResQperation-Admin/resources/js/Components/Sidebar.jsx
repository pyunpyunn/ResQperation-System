import { Link } from '@inertiajs/react';

const DashboardIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
);

const DisastersIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
    </svg>
);

const RespondersIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.64 2.2 1.56 2.93 2.55 1.23-.45 4.01-1.82 4.01-3.6V13h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
);

const HouseholdsIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
);

const RequestsIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7l-5-5zm0 18H6V4h8v4h2v12zm-2-8H8v2h5v-2zm3 6H8v-2h8v2z" />
    </svg>
);

const AccountsIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm8 0c-.29 0-.62.02-.97.05 1.43 1.03 2.47 2.41 2.88 3.95H24v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3zm-1 14-4-4 1.41-1.41L11 13.17l4.59-4.58L17 10l-6 6z" />
    </svg>
);

const getIcon = (iconName) => {
    const icons = {
        accounts: <AccountsIcon />,
        dashboard: <DashboardIcon />,
        disasters: <DisastersIcon />,
        households: <HouseholdsIcon />,
        requests: <RequestsIcon />,
        responders: <RespondersIcon />,
        shield: <ShieldIcon />,
    };

    return icons[iconName] || null;
};

const SidebarLink = ({ href, icon, label, isActive, isCollapsed, onClick }) => (
    <Link
        href={href}
        onClick={onClick}
        className={`relative flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 group ${
            isActive
                ? 'bg-primary-container text-surface'
                : 'text-on-surface hover:bg-surface-container-high'
        }`}
    >
        <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            {icon}
        </div>
        {!isCollapsed && <span className="flex-1 truncate">{label}</span>}
        {isActive && (
            <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-on-surface" />
        )}
        {isCollapsed && (
            <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-surface-container-high px-2 py-1 text-sm text-on-surface opacity-0 transition-opacity group-hover:opacity-100">
                {label}
            </div>
        )}
    </Link>
);

const SidebarContent = ({ navItems, isCollapsed, onLinkClick }) => {
    const groups = {};

    navItems.forEach((item) => {
        const group = item.group || 'main';
        if (!groups[group]) groups[group] = [];
        groups[group].push(item);
    });

    const groupLabels = {
        main: 'Main',
        operations: 'Operations',
        oversight: 'Oversight',
        resources: 'Resources',
    };

    return (
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-6">
            {Object.entries(groups).map(([groupKey, items]) => (
                <div key={groupKey}>
                    {!isCollapsed && (
                        <h3 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-on-surface/60">
                            {groupLabels[groupKey] || groupKey}
                        </h3>
                    )}
                    <div className="space-y-2">
                        {items.map((item) => (
                            <SidebarLink
                                key={item.key}
                                href={item.href}
                                icon={getIcon(item.icon)}
                                label={item.name}
                                isActive={route().current(item.route || item.key)}
                                isCollapsed={isCollapsed}
                                onClick={onLinkClick}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );
};

const SidebarDesktop = ({ isOpen, onToggle, navItems, onLinkClick }) => (
    <aside className={`hidden overflow-hidden border-r border-surface-container-high bg-surface transition-all duration-300 lg:flex lg:flex-col ${
        isOpen ? 'w-72' : 'w-24'
    }`}>
        <div className="flex items-center justify-between border-b border-surface-container-high px-4 py-6">
            <div className={`flex items-center gap-2 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-container text-sm font-bold text-surface">
                    R
                </div>
                {isOpen && <span className="text-sm font-semibold text-on-surface">ResQ</span>}
            </div>
            <button
                onClick={onToggle}
                className="flex-shrink-0 rounded-lg p-2 transition-colors hover:bg-surface-container-high"
                title={isOpen ? 'Collapse' : 'Expand'}
            >
                <svg
                    className={`h-5 w-5 text-on-surface transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </div>
        <SidebarContent navItems={navItems} isCollapsed={!isOpen} onLinkClick={onLinkClick} />
    </aside>
);

const SidebarMobile = ({ isOpen, onClose, navItems }) => (
    <>
        {isOpen && (
            <div
                className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                onClick={onClose}
            />
        )}
        <div
            className={`fixed left-0 top-16 z-30 max-h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-surface-container-high bg-surface transition-transform duration-300 lg:hidden ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <SidebarContent
                navItems={navItems}
                isCollapsed={false}
                onLinkClick={onClose}
            />
        </div>
    </>
);

export default function Sidebar({ isMobile, isOpen, onToggle, navItems, onMobileClose }) {
    if (isMobile) {
        return <SidebarMobile isOpen={isOpen} onClose={onMobileClose || onToggle} navItems={navItems} />;
    }

    return <SidebarDesktop isOpen={isOpen} onToggle={onToggle} navItems={navItems} />;
}

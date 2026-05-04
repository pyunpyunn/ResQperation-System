import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const AUTH_STORAGE_KEY = 'resqperation.web.session';
const LOGO_URL = `${import.meta.env.BASE_URL}resqperation-logo.svg`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

const navItems = [
  { key: 'dashboard', name: 'Dashboard', group: 'Main', icon: 'dashboard' },
  { key: 'disasters', name: 'Disaster Tracking', group: 'Operations', icon: 'alert' },
  { key: 'requests', name: 'Requests', group: 'Operations', icon: 'requests' },
  { key: 'responders', name: 'Responders', group: 'Resources', icon: 'responders' },
  { key: 'households', name: 'Households', group: 'Resources', icon: 'households' },
  { key: 'accounts', name: 'Accounts', group: 'Oversight', icon: 'accounts' },
  { key: 'archives', name: 'Archives', group: 'Oversight', icon: 'archives' },
];

const pageCopy = {
  dashboard: {
    title: 'Dashboard',
    description: 'Real-time operational overview for active disaster events.',
    cards: [
      ['Active incidents', '2'],
      ['Unsafe households', '348'],
      ['Deployed teams', '6 / 8'],
      ['Pending requests', '5'],
    ],
  },
  disasters: {
    title: 'Disaster Tracking',
    description: 'Monitor active events, severity, and affected areas.',
    cards: [
      ['Critical', '1'],
      ['High priority', '3'],
      ['Resolved today', '4'],
      ['Watch zones', '8'],
    ],
  },
  requests: {
    title: 'Requests',
    description: 'Review incoming aid, rescue, and resource requests.',
    cards: [
      ['Pending', '5'],
      ['Approved', '12'],
      ['Forwarded', '7'],
      ['Completed', '28'],
    ],
  },
  responders: {
    title: 'Responders',
    description: 'Track teams, deployment status, and field availability.',
    cards: [
      ['Active teams', '6'],
      ['On-site', '18'],
      ['Standby', '6'],
      ['Needs update', '2'],
    ],
  },
  households: {
    title: 'Households',
    description: 'Monitor household safety status and evacuation progress.',
    cards: [
      ['Registered', '348'],
      ['Safe', '102'],
      ['Evacuated', '87'],
      ['Need help', '43'],
    ],
  },
  accounts: {
    title: 'Accounts',
    description: 'Role-based account oversight for HQ, rescuers, and residents.',
    cards: [
      ['HQ admins', '2'],
      ['Rescuers', '24'],
      ['Residents', '348'],
      ['Disabled', '0'],
    ],
  },
  archives: {
    title: 'Archives',
    description: 'Review closed incidents, reports, and response history.',
    cards: [
      ['Closed incidents', '14'],
      ['Reports', '52'],
      ['Exports', '9'],
      ['This month', '6'],
    ],
  },
};

const groupedNavItems = navItems.reduce((groups, item) => {
  groups[item.group] ||= [];
  groups[item.group].push(item);
  return groups;
}, {});

function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

function readStoredSession() {
  try {
    const value = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function storeSession(session) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  setAuthToken(session.token);
}

function clearStoredSession() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  setAuthToken(null);
}

function Icon({ name, className = 'h-5 w-5' }) {
  const paths = {
    accounts: 'M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3ZM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Zm8 0c-.29 0-.62.02-.97.05 1.43 1.03 2.47 2.41 2.88 3.95H24v-2c0-2.66-5.33-4-8-4Z',
    alert: 'M12 2 1 21h22L12 2Zm1 16h-2v-2h2v2Zm0-4h-2v-4h2v4Z',
    archives: 'M20 6h-2.18l-1-3H7.18l-1 3H4c-1.1 0-2 .9-2 2v2c0 .74.4 1.38 1 1.73V20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8.27c.6-.35 1-.99 1-1.73V8c0-1.1-.9-2-2-2ZM8.62 5h6.76l.33 1H8.29l.33-1ZM19 20H5v-8h14v8Zm1-10H4V8h16v2Zm-11 4h6v2H9v-2Z',
    dashboard: 'M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z',
    households: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z',
    lock: 'M17 8h-1V6c0-2.76-2.24-5-5-5S6 3.24 6 6v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2ZM8 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H8V6Zm4 11.73V19h-2v-1.27c-.6-.35-1-.99-1-1.73 0-1.1.9-2 2-2s2 .9 2 2c0 .74-.4 1.38-1 1.73Z',
    logout: 'M10 17v-3H3v-4h7V7l5 5-5 5Zm2-15h8c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2h-8v-2h8V4h-8V2Z',
    menu: 'M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z',
    requests: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6Zm0 7V3.5L18.5 9H14ZM8 13h8v2H8v-2Zm0 4h8v2H8v-2Zm0-8h4v2H8V9Z',
    responders: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z',
    shield: 'M12 2 4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3Zm-1 14-4-4 1.41-1.41L11 13.17l4.59-4.58L17 10l-6 6Z',
  };

  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name] || paths.dashboard} />
    </svg>
  );
}

function BrandLogo({ className = 'h-11 w-11' }) {
  return (
    <img
      src={LOGO_URL}
      alt="ResQperation logo"
      className={`${className} shrink-0 rounded-[0.9rem]`}
    />
  );
}

function LoginScreen({ loginId, password, error, onLoginIdChange, onPasswordChange, onSubmit }) {
  const flowSteps = [
    'Enter the provided user ID and temporary password.',
    'The backend verifies credentials and detects the role automatically.',
    'A protected access token is issued for the current session.',
    'The web interface opens the correct workspace for that role.',
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-10 text-on-surface">
      <section className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_28rem]">
        <div className="flex flex-col justify-center rounded-[2rem] bg-primary-container p-8 text-surface shadow-ambient lg:p-10">
          <div className="mb-8 flex items-center gap-4">
            <BrandLogo className="h-12 w-12" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-surface/70">Secure HQ Access</p>
              <p className="mt-1 text-lg font-bold text-surface">ResQperation</p>
            </div>
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">ResQperation Command Center</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-surface/75 md:text-base">
            Sign in with the credentials created by HQ. The system uses one backend login and changes the workspace by role.
          </p>
        </div>

        <form onSubmit={onSubmit} className="rounded-[1.75rem] bg-surface-container-low p-6 shadow-ambient">
          <div className="mb-6 rounded-[1.5rem] bg-surface-container-lowest p-5 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-on-surface/70">ResQperation</p>
            <h2 className="mt-3 text-2xl font-bold text-on-surface">Sign in</h2>
            <p className="mt-2 text-sm text-on-surface/75">Use your provided user ID and temporary password.</p>
          </div>

          <label className="block text-sm font-semibold text-on-surface">
            User ID
            <input
              value={loginId}
              onChange={(event) => onLoginIdChange(event.target.value)}
              className="mt-2 block w-full rounded-[1rem] border-0 bg-surface-container-lowest px-4 py-3 text-on-surface shadow-sm ring-1 ring-surface-container-high transition focus:ring-2 focus:ring-primary"
              autoComplete="username"
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-on-surface">
            Temporary password
            <input
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              className="mt-2 block w-full rounded-[1rem] border-0 bg-surface-container-lowest px-4 py-3 text-on-surface shadow-sm ring-1 ring-surface-container-high transition focus:ring-2 focus:ring-primary"
              type="password"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="mt-4 rounded-[1rem] bg-critical/10 px-4 py-3 text-sm font-semibold text-critical">{error}</p>}

          <div className="mt-6 rounded-[1.5rem] bg-surface-container-lowest p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-on-surface/60">Authentication Flow</p>
            <div className="mt-4 space-y-3">
              {flowSteps.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index === 0 ? <Icon name="lock" className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <p className="text-sm leading-6 text-on-surface/80">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-6 w-full rounded-[1rem] bg-primary-container px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-surface transition hover:bg-primary-container/90" type="submit">
            Log in
          </button>
        </form>
      </section>
    </main>
  );
}

function Sidebar({ activePage, collapsed, onSelectPage, onToggle }) {
  return (
    <aside className={`app-sidebar ${collapsed ? 'app-sidebar-collapsed' : 'app-sidebar-expanded'}`}>
      <div className="flex h-20 items-center justify-between border-b border-surface-container-high px-4">
        <div className={`flex items-center gap-3 ${collapsed ? 'lg:opacity-0' : 'opacity-100'}`}>
          <BrandLogo className="h-9 w-9" />
          {!collapsed && <span className="text-sm font-semibold text-on-surface">ResQ</span>}
        </div>
        <button
          className="hidden rounded-xl p-2 text-on-surface transition hover:bg-surface-container-high lg:inline-flex"
          onClick={onToggle}
          title={collapsed ? 'Expand menu' : 'Collapse menu'}
          type="button"
        >
          <Icon name="menu" className="h-5 w-5" />
        </button>
      </div>

      <nav className="h-[calc(100vh-5rem)] space-y-6 overflow-y-auto px-3 py-6">
        {Object.entries(groupedNavItems).map(([group, items]) => (
          <div key={group}>
            {!collapsed && <p className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-on-surface/60">{group}</p>}
            <div className="space-y-2">
              {items.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectPage(item.key)}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition ${
                    activePage === item.key
                      ? 'bg-primary-container text-surface'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  {!collapsed && <span className="truncate">{item.name}</span>}
                  {activePage === item.key && <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-on-surface" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function MobileNav({ activePage, onSelectPage }) {
  return (
    <nav className="app-mobile-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onSelectPage(item.key)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
            activePage === item.key
              ? 'bg-primary-container text-surface'
              : 'bg-surface-container-low text-on-surface'
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <Icon name={item.icon} className="h-4 w-4" />
            {item.name}
          </span>
        </button>
      ))}
    </nav>
  );
}

function Workspace({ session, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const page = pageCopy[activePage];
  const roleLabel = session.user.role === 'super_admin' ? 'Super Admin' : session.user.role.replaceAll('_', ' ');
  const listRows = useMemo(() => [
    ['Typhoon Carina - Purok 4', 'Critical', 'Active'],
    ['Flooding - Sitio Mapayapa', 'High', 'Monitoring'],
    ['Team Alpha', 'En route', 'Updated 4m ago'],
    ['Medical supplies - EvaTrack', 'Approved', 'Forwarded'],
  ], []);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="app-header">
        <div className="app-header-brand">
          <img
            src={LOGO_URL}
            alt="ResQperation logo"
            className="h-11 w-11 shrink-0 rounded-[0.9rem]"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight text-on-surface sm:text-lg">
              ResQperation Command Center
            </p>
            <p className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-on-surface/60">
              {page.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-on-surface">{session.user.name}</p>
            <p className="text-xs capitalize text-on-surface/60">{roleLabel} | ID {session.user.login_id}</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {roleLabel}
          </span>
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-critical/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-critical transition hover:bg-critical hover:text-white"
            title="Log out securely"
          >
            <Icon name="logout" className="h-4 w-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      <Sidebar activePage={activePage} collapsed={collapsed} onSelectPage={setActivePage} onToggle={() => setCollapsed((value) => !value)} />
      <MobileNav activePage={activePage} onSelectPage={setActivePage} />

      <main className={`app-main ${collapsed ? 'lg:pl-24' : 'lg:pl-72'}`}>
        <section className="border-b border-surface-container-high/30 bg-surface-container-lowest px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-semibold tracking-tight text-on-surface">{page.title}</h2>
            <p className="mt-1 text-sm text-on-surface/80">{page.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {page.cards.map(([label, value]) => (
              <div key={label} className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
                <p className="text-label-md uppercase text-on-surface/80">{label}</p>
                <p className="mt-4 text-3xl font-bold text-on-surface">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-on-surface">Operational feed</h3>
                  <p className="mt-1 text-sm text-on-surface/80">Current records for this workspace.</p>
                </div>
                <button className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary" type="button">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {listRows.map(([label, meta, status]) => (
                  <div key={`${activePage}-${label}`} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-on-surface">{label}</p>
                        <p className="mt-1 text-sm text-on-surface/70">{meta}</p>
                      </div>
                      <span className="w-fit rounded-full bg-safe/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-safe">
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-surface-container-low p-6 shadow-ambient">
              <h3 className="text-lg font-semibold text-on-surface">Workspace controls</h3>
              <div className="mt-5 space-y-4">
                {['Validated access', 'Role-based navigation', 'Shared backend API'].map((item) => (
                  <div key={item} className="rounded-[1.5rem] bg-surface-container-lowest p-4">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-safe/10 p-2 text-safe">
                        <Icon name="shield" className="h-4 w-4" />
                      </span>
                      <p className="font-semibold text-on-surface">{item}</p>
                    </div>
                    <p className="mt-1 text-sm text-on-surface/75">Enabled</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`app-footer ${collapsed ? 'lg:left-24' : 'lg:left-72'}`}>
        <span>ResQperation Command Center</span>
        <span className="hidden sm:inline">Backend: {API_BASE_URL}</span>
      </footer>
    </div>
  );
}

export default function App() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null);
  const [error, setError] = useState('');
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    const storedSession = readStoredSession();

    if (!storedSession?.token) {
      setIsBootstrapping(false);
      return;
    }

    let cancelled = false;
    setAuthToken(storedSession.token);

    api.get('/auth/me')
      .then(({ data }) => {
        if (cancelled) return;
        const restoredSession = {
          token: storedSession.token,
          user: data.user,
        };
        storeSession(restoredSession);
        setSession(restoredSession);
      })
      .catch(() => {
        if (cancelled) return;
        clearStoredSession();
        setSession(null);
      })
      .finally(() => {
        if (!cancelled) {
          setIsBootstrapping(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/login', {
        login_id: loginId,
        password,
      });

      storeSession(data);
      setSession(data);
      setPassword('');
    } catch {
      setError('Invalid user ID or temporary password.');
    }
  }

  async function handleLogout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // The local session must still be cleared if the token is already expired or revoked.
    } finally {
      clearStoredSession();
      setSession(null);
      setLoginId('');
      setPassword('');
    }
  }

  if (isBootstrapping) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface px-6 text-on-surface">
        <div className="rounded-[1.75rem] bg-surface-container-low p-8 text-center shadow-ambient">
          <BrandLogo className="mx-auto h-14 w-14" />
          <h1 className="mt-5 text-xl font-bold">Restoring secure session</h1>
          <p className="mt-2 text-sm text-on-surface/70">Checking your active ResQperation access token.</p>
        </div>
      </main>
    );
  }

  if (session?.user) {
    return <Workspace session={session} onLogout={handleLogout} />;
  }

  return (
    <LoginScreen
      loginId={loginId}
      password={password}
      error={error}
      onLoginIdChange={setLoginId}
      onPasswordChange={setPassword}
      onSubmit={handleLogin}
    />
  );
}

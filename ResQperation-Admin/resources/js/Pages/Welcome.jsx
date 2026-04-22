import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="ResQperation HQ" />
            <div className="relative min-h-screen overflow-hidden bg-surface text-on-surface">
                <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-br from-primary/10 via-surface/60 to-surface" />
                <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-16 sm:px-8 lg:px-12">
                    <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid h-14 w-14 place-items-center rounded-[1.75rem] bg-primary text-white shadow-ambient">
                                <span className="text-xl font-bold">R</span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-on-surface/80">
                                    ResQperation HQ
                                </p>
                                <h1 className="mt-2 text-4xl font-black tracking-tight text-on-surface sm:text-5xl">
                                    Rescue coordination built for command center operations.
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center rounded-[1.5rem] bg-primary px-6 py-3 text-sm font-semibold text-white shadow-ambient transition hover:bg-slate-900"
                                >
                                    Go to dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center rounded-[1.5rem] bg-primary px-6 py-3 text-sm font-semibold text-white shadow-ambient transition hover:bg-slate-900"
                                >
                                    Admin login
                                </Link>
                            )}
                        </div>
                    </header>

                    <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
                        <div className="rounded-[2rem] bg-surface-container-low p-10 shadow-ambient">
                            <p className="text-sm uppercase tracking-[0.2em] text-on-surface/80">
                                HQ portal overview
                            </p>
                            <h2 className="mt-4 text-3xl font-bold text-on-surface sm:text-4xl">
                                Monitor households, responders, disasters, and request flow from one secure hub.
                            </h2>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-surface/75">
                                ResQperation is designed for an HQ user experience with precise incident awareness,
                                responder coordination, and disaster request management.
                            </p>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-on-surface/80">
                                        Data sync
                                    </p>
                                    <p className="mt-3 text-xl font-semibold text-on-surface">
                                        Real-time alerts & status feeds
                                    </p>
                                </div>
                                <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                                    <p className="text-sm uppercase tracking-[0.18em] text-on-surface/80">
                                        Command center
                                    </p>
                                    <p className="mt-3 text-xl font-semibold text-on-surface">
                                        Responder & evacuation oversight
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-surface-container-lowest p-8 shadow-ambient">
                            <p className="text-sm uppercase tracking-[0.18em] text-on-surface/80">
                                What HQ needs
                            </p>
                            <div className="mt-6 space-y-4">
                                <div className="rounded-[1.5rem] bg-surface-container-low p-5">
                                    <p className="font-semibold text-on-surface">Disaster tracking</p>
                                    <p className="mt-2 text-on-surface/80">Incident monitoring and severity classification.</p>
                                </div>
                                <div className="rounded-[1.5rem] bg-surface-container-low p-5">
                                    <p className="font-semibold text-on-surface">Responder roster</p>
                                    <p className="mt-2 text-on-surface/80">Team assignments and field readiness.</p>
                                </div>
                                <div className="rounded-[1.5rem] bg-surface-container-low p-5">
                                    <p className="font-semibold text-on-surface">Household status</p>
                                    <p className="mt-2 text-on-surface/80">Geo-tagged resident updates and evacuation data.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-10 rounded-[2rem] bg-surface-container-low p-8 shadow-ambient">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-[1.5rem] bg-surface-container-lowest p-6">
                                <p className="text-sm uppercase tracking-[0.18em] text-on-surface/80">HQ workflow</p>
                                <p className="mt-3 text-lg font-semibold text-on-surface">Alert management</p>
                            </div>
                            <div className="rounded-[1.5rem] bg-surface-container-lowest p-6">
                                <p className="text-sm uppercase tracking-[0.18em] text-on-surface/80">Operations</p>
                                <p className="mt-3 text-lg font-semibold text-on-surface">Request coordination</p>
                            </div>
                            <div className="rounded-[1.5rem] bg-surface-container-lowest p-6">
                                <p className="text-sm uppercase tracking-[0.18em] text-on-surface/80">Verification</p>
                                <p className="mt-3 text-lg font-semibold text-on-surface">QR and evacuation tracking</p>
                            </div>
                        </div>
                    </section>

                    <footer className="mt-16 border-t border-on-surface/10 pt-8 text-center text-sm text-on-surface/80">
                        <p>ResQperation HQ © 2026 | Disaster Coordination Platform</p>
                    </footer>
                </div>
            </div>
        </>
    );
}

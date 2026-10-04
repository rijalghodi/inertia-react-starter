import { Head, Link, usePage } from "@inertiajs/react";

import { dashboard, login } from "@/routes";

export default function Welcome() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Selamat Datang" />
      <div className="flex min-h-screen flex-col">
        {/* Navigation */}
        <header className="flex w-full items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md">
              <span className="text-xl font-bold">U</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Undangan</span>
          </div>
          <nav className="flex items-center justify-end gap-4">
            {auth.user ? (
              <Link
                href={dashboard()}
                className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors"
              >
                Dasbor Saya
              </Link>
            ) : (
              <Link
                href={login()}
                className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors"
              >
                Masuk
              </Link>
            )}
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 font-display text-5xl font-bold tracking-tight text-primary sm:text-7xl">
              Buat Undangan Digital Impian Anda
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Platform modern untuk membuat dan membagikan undangan pernikahan digital yang indah, elegan, dan berkesan
              bagi tamu Anda.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {auth.user ? (
                <Link
                  href={dashboard()}
                  className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors"
                >
                  Ke Dasbor
                </Link>
              ) : (
                <Link
                  href={login()}
                  className="inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors"
                >
                  Mulai Sekarang — Gratis
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

Welcome.layout = undefined; // Don't use default layout if any

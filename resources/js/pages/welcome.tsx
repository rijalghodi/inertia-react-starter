import { Head, Link, usePage } from "@inertiajs/react";

import { dashboard, login } from "@/routes";

export default function Welcome() {
  const { auth } = usePage().props;

  return (
    <>
      <Head title="Selamat Datang" />
      <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
        {/* Navigation */}
        <header className="flex w-full items-center justify-between p-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black">
              <span className="text-xl font-bold">U</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Undangan</span>
          </div>
          <nav className="flex items-center justify-end gap-4">
            {auth.user ? (
              <Link
                href={dashboard()}
                className="inline-block rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Dasbor Saya
              </Link>
            ) : (
              <Link
                href={login()}
                className="inline-block rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 transition-colors dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Masuk
              </Link>
            )}
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 text-center lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Buat Undangan Digital Impian Anda
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Platform modern untuk membuat dan membagikan undangan pernikahan digital yang indah, elegan, dan berkesan bagi tamu Anda.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {auth.user ? (
                <Link
                  href={dashboard()}
                  className="rounded-full bg-black px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-black/90 transition-all dark:bg-white dark:text-black dark:hover:bg-white/90"
                >
                  Ke Dasbor
                </Link>
              ) : (
                <Link
                  href={login()}
                  className="rounded-full bg-black px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-black/90 transition-all dark:bg-white dark:text-black dark:hover:bg-white/90"
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

import { Head, router } from "@inertiajs/react";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from "react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/lib/firebase";

export default function VerifyEmailLink() {
  const [email, setEmail] = useState("");
  const [needsEmail, setNeedsEmail] = useState(false);
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState("");

  const handleFirebaseLogin = async (idToken: string) => {
    router.post(
      "/auth/firebase",
      { idToken },
      {
        preserveScroll: true,
        onError: () => {
          setProcessing(false);
          setError("Gagal membuat sesi aman dengan server.");
        },
        onFinish: () => setProcessing(false),
      },
    );
  };

  const processSignIn = async (signInEmail: string) => {
    try {
      const result = await signInWithEmailLink(auth, signInEmail, window.location.href);
      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");

      const idToken = await result.user.getIdToken();
      await handleFirebaseLogin(idToken);
    } catch (err: any) {
      setProcessing(false);
      setError(err.message || "Gagal masuk dengan tautan.");
    }
  };

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let savedEmail = window.localStorage.getItem("emailForSignIn");
      if (!savedEmail) {
        // If missing email, ask the user to provide it.
        setNeedsEmail(true);
        setProcessing(false);
      } else {
        void processSignIn(savedEmail);
      }
    } else {
      setProcessing(false);
      setError("Tautan ini tidak valid atau telah kedaluwarsa.");
    }
  }, []);

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    void processSignIn(email);
  };

  return (
    <>
      <Head title="Memverifikasi Tautan" />

      <div className="flex flex-col gap-6">
        {processing && !needsEmail && (
          <div className="flex flex-col items-center gap-4 text-center">
            <Spinner className="h-8 w-8" />
            <p className="text-sm text-muted-foreground">Sedang memverifikasi tautan ajaib Anda...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 text-center">
            <InputError message={error} />
            <Button variant="outline" onClick={() => router.visit("/login")} className="mt-4">
              Kembali ke Halaman Masuk
            </Button>
          </div>
        )}

        {needsEmail && !processing && !error && (
          <form onSubmit={submitEmail} className="grid gap-6">
            <div className="mb-2 text-sm text-muted-foreground">
              Harap konfirmasi alamat email Anda untuk menyelesaikan proses masuk.
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Alamat email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="email@example.com"
              />
            </div>
            <Button type="submit" className="w-full">
              Selesaikan Proses Masuk
            </Button>
          </form>
        )}
      </div>
    </>
  );
}

VerifyEmailLink.layout = {
  title: "Memverifikasi Otentikasi",
  description: "Harap tunggu sementara kami memasukkan Anda...",
};

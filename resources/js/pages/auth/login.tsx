import { Head, router } from "@inertiajs/react";
import { signInWithPopup, GoogleAuthProvider, sendSignInLinkToEmail } from "firebase/auth";
import { useState } from "react";

import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { IconGoogle } from "@/components/ui/icon-google";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");
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

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError("");
    setStatus("");

    try {
      const actionCodeSettings = {
        url: window.location.origin + "/auth/verify-email",
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setStatus("Tautan ajaib telah dikirim ke alamat email Anda. Silakan periksa kotak masuk Anda.");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Gagal mengirim tautan ajaib.");
    } finally {
      setProcessing(false);
    }
  };

  const loginWithGoogle = async () => {
    setProcessing(true);
    setError("");
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await handleFirebaseLogin(idToken);
    } catch (err: any) {
      setProcessing(false);
      setError(err.message || "Gagal masuk dengan Google.");
    }
  };

  return (
    <>
      <Head title="Masuk atau Daftar" />

      {status && <div className="mb-4 text-center text-sm font-medium text-success">{status}</div>}

      <form onSubmit={sendMagicLink} className="flex flex-col gap-6">
        <div className="grid gap-4">
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
              tabIndex={1}
              autoComplete="email"
              placeholder="email@example.com"
            />
          </div>

          {error && <InputError message={error} />}

          <Button type="submit" className="w-full" tabIndex={2} disabled={processing}>
            {processing && <Spinner />}
            Kirim Tautan Ajaib
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Atau lanjutkan dengan</span>
          </div>
        </div>

        <Button type="button" variant="outline" onClick={loginWithGoogle} disabled={processing} className="w-full">
          <IconGoogle /> Google
        </Button>
      </form>
    </>
  );
}

Login.layout = {
  title: "Selamat Datang di " + import.meta.env.VITE_APP_NAME,
  description: "Masuk atau buat akun untuk melanjutkan",
};

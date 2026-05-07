"use client";

import { useSignUp, useSignIn } from "@clerk/nextjs"; // ← useSignIn add kiya
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { SignInResource } from "@clerk/types";
import type { SignUpResource } from "@clerk/types";

export default function SignUpPage() {
  const signUp = useSignUp();
  const { signIn } = useSignIn(); // ← OAuth ke liye
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return; // ← sirf signUp check
    setLoading(true);
    setError("");
    try {
      const s = signUp as unknown as SignUpResource; // ← type cast
      await s.create({
        firstName: name.split(" ")[0] || name,
        lastName: name.split(" ").slice(1).join(" ") || undefined,
        emailAddress: email,
        password,
      });
      await s.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push("/verify-email");
    } catch (err: any) {
      setError(
        err.errors?.[0]?.longMessage ||
          err.errors?.[0]?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  }

async function handleOAuth(provider: "oauth_google" | "oauth_github") {
  if (!signIn) return;
  try {
    await (signIn as unknown as SignInResource).authenticateWithRedirect({
      // ✅
      strategy: provider,
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectUrlComplete: "/dashboard",
    });
  } catch (err: any) {
    setError(err.errors?.[0]?.message || "OAuth failed");
  }
}

  // baaki JSX same rehta hai...

  return (
    <main className="min-h-screen bg-[#0a0a0a] grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      {/* LEFT PANEL */}
      <div
        className="hidden md:flex flex-col justify-between px-10 py-10 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(25,6,6,0.98) 0%, rgba(12,4,4,0.99) 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden opacity-35 pointer-events-none">
          <div
            className="absolute -top-[20%] -right-[10%] w-[55%] h-[130%] rounded-sm"
            style={{
              background: "linear-gradient(to bottom,#7f0000,#3f0000)",
              transform: "skewX(-18deg)",
            }}
          />
          <div
            className="absolute -top-[20%] right-[8%] w-[30%] h-[130%] rounded-sm"
            style={{
              background: "linear-gradient(to bottom,#5a0000,#2a0000)",
              transform: "skewX(-18deg)",
            }}
          />
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded-[6px]" />
          <span className="text-[15px] font-semibold text-white/90 tracking-[-0.4px]">
            Inferix
          </span>
        </div>

        <div className="relative z-10">
          <div className="text-[11px] text-red-400/70 tracking-[1px] uppercase mb-3">
            Local AI Platform
          </div>
          <h2 className="text-[clamp(20px,2.5vw,26px)] font-medium text-white/90 tracking-[-0.8px] leading-[1.25] mb-3">
            Run AI models.
            <br />
            <span className="text-white/20">Own your data.</span>
          </h2>
          <p className="text-[12px] text-white/28 leading-[1.65] mb-6">
            Inferix runs entirely on your machine. No API keys, no data leaving
            your hardware.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { val: "52 tok/s", label: "average speed" },
              { val: "0 bytes", label: "sent to cloud" },
              { val: "3 models", label: "ready to run" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)] flex-shrink-0" />
                <span className="text-[12px] text-white/35">
                  <strong className="text-white/60 font-medium">{s.val}</strong>{" "}
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-white/15">
          Inferix · Built by Ashutosh Kumar Rao · 2026
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-col justify-center px-6 sm:px-10 py-10 bg-[#0f0f0f] relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-red-900/12 blur-[70px] pointer-events-none" />

        <div className="w-full max-w-[340px] mx-auto relative z-10">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-red-500 rounded-[5px]" />
            <span className="text-[14px] font-semibold text-white/88">
              Inferix
            </span>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#1a1a1a] border border-white/[0.08] rounded-full p-1 mb-5">
            <Link
              href="/sign-in"
              className="flex-1 text-center text-[12px] py-1.5 rounded-full text-white/30 hover:text-white/55 transition-colors"
            >
              Sign in
            </Link>
            <div className="flex-1 text-center text-[12px] py-1.5 rounded-full bg-[#1f1f1f] border border-white/[0.12] text-white/85 font-medium cursor-default">
              Sign up
            </div>
          </div>

          <h1 className="text-[17px] font-medium text-white/88 tracking-[-0.4px] mb-1">
            Create account
          </h1>
          <p className="text-[12px] text-white/28 mb-5">
            Start running AI locally for free
          </p>

          {/* OAuth */}
          <button
            onClick={() => handleOAuth("oauth_google")}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1a1a1a] border border-white/[0.09] text-white/55 text-[12px] hover:bg-[#222] hover:border-white/20 hover:text-white/82 transition-all mb-2"
          >
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-[9px] font-bold text-blue-500 flex-shrink-0">
              G
            </div>
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth("oauth_github")}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#1a1a1a] border border-white/[0.09] text-white/55 text-[12px] hover:bg-[#222] hover:border-white/20 hover:text-white/82 transition-all mb-4"
          >
            <div className="w-4 h-4 rounded-full bg-[#24292e] flex items-center justify-center text-[10px] text-white flex-shrink-0">
              ⌥
            </div>
            Continue with GitHub
          </button>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] text-white/18">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {error && (
            <div className="text-[11px] text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-3 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <div className="text-[11px] text-white/32 mb-1.5 pl-1">
                Full name
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Ashutosh Kumar Rao"
                className="w-full bg-[#1a1a1a] border border-white/[0.09] rounded-full px-4 py-2.5 text-[12px] text-white/72 outline-none focus:border-red-500/50 focus:bg-[#1f1010] transition-all placeholder:text-white/20"
              />
            </div>
            <div>
              <div className="text-[11px] text-white/32 mb-1.5 pl-1">
                Email address
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-[#1a1a1a] border border-white/[0.09] rounded-full px-4 py-2.5 text-[12px] text-white/72 outline-none focus:border-red-500/50 focus:bg-[#1f1010] transition-all placeholder:text-white/20"
              />
            </div>
            <div>
              <div className="text-[11px] text-white/32 mb-1.5 pl-1">
                Password
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-white/[0.09] rounded-full px-4 py-2.5 pr-10 text-[12px] text-white/72 outline-none focus:border-red-500/50 focus:bg-[#1f1010] transition-all placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/22 hover:text-white/50 transition-colors text-xs"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full text-[13px] font-medium text-white tracking-[-0.2px] transition-all hover:-translate-y-[1px] disabled:opacity-50 relative overflow-hidden mt-1"
              style={{
                background: "linear-gradient(135deg,#dc2626 0%,#991b1b 100%)",
                boxShadow: "0 4px 20px rgba(239,68,68,0.3)",
              }}
            >
              <span
                className="absolute top-0 right-0 w-[35%] h-full pointer-events-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  transform: "skewX(-20deg)",
                  transformOrigin: "top right",
                }}
              />
              {loading ? "Creating account..." : "Create account →"}
            </button>
          </form>

          <div className="text-center mt-4 text-[12px] text-white/22">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-red-400/75 hover:text-red-400 transition-colors"
            >
              Sign in
            </Link>
          </div>
          <div className="text-center mt-2.5 text-[10px] text-white/12">
            🔒 Secured by Clerk
          </div>
        </div>
      </div>
    </main>
  );
}

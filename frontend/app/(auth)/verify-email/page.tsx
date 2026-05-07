"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import type { SignUpResource } from "@clerk/types";
import { useSignUp, useClerk } from "@clerk/nextjs";
export default function VerifyEmailPage() {

  const signUp = useSignUp();
const { setActive } = useClerk();// ✅ isLoaded + setActive add kiya
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
async function handleVerify(e: React.FormEvent) {
  e.preventDefault();
  if (!signUp) return;
  setLoading(true);
  setError("");
  try {
   const result = await (
     signUp as unknown as SignUpResource
   ).attemptEmailAddressVerification({ code });
    if (result.status === "complete") {
      await setActive({ session: result.createdSessionId });
      router.push("/dashboard");
    } else {
      setError("Verification incomplete. Please try again.");
    }
  } catch (err: any) {
    setError(
      err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        "Invalid code",
    );
  } finally {
    setLoading(false);
  }
}

async function handleResend() {
  if (!signUp) return;
  try {
    await (signUp as unknown as SignUpResource).prepareEmailAddressVerification(
      { strategy: "email_code" },
    ); // ✅
  } catch (err: any) {
    setError(err.errors?.[0]?.message || "Failed to resend");
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
            Verify your email
          </div>
          <h2 className="text-[clamp(20px,2.5vw,26px)] font-medium text-white/90 tracking-[-0.8px] leading-[1.25] mb-3">
            One last step.
            <br />
            <span className="text-white/20">Check your inbox.</span>
          </h2>
          <p className="text-[12px] text-white/28 leading-[1.65] mb-6">
            We sent a 6-digit code to your email. Enter it to verify your
            account and start running AI locally.
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { val: "6-digit", label: "verification code" },
              { val: "Instant", label: "account activation" },
              { val: "Secure", label: "email verification" },
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
          <div className="flex md:hidden items-center gap-2 mb-6">
            <div className="w-5 h-5 bg-red-500 rounded-[5px]" />
            <span className="text-[14px] font-semibold text-white/88">
              Inferix
            </span>
          </div>

          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl mb-5">
            📧
          </div>

          <h1 className="text-[17px] font-medium text-white/88 tracking-[-0.4px] mb-1">
            Verify your email
          </h1>
          <p className="text-[12px] text-white/28 mb-6">
            Enter the 6-digit code we sent to your email address
          </p>

          {error && (
            <div className="text-[11px] text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <div>
              <div className="text-[11px] text-white/32 mb-1.5 pl-1">
                Verification code
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                required
                maxLength={6}
                placeholder="000000"
                className="w-full bg-[#1a1a1a] border border-white/[0.09] rounded-full px-4 py-2.5 text-[18px] text-white/72 outline-none focus:border-red-500/50 focus:bg-[#1f1010] transition-all placeholder:text-white/20 tracking-[8px] text-center font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-2.5 rounded-full text-[13px] font-medium text-white tracking-[-0.2px] transition-all hover:-translate-y-[1px] disabled:opacity-50 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#dc2626 0%,#991b1b 100%)",
                boxShadow: "0 4px 20px rgba(239,68,68,0.3)",
              }}
            >
              {loading ? "Verifying..." : "Verify email →"}
            </button>
          </form>

          <div className="text-center mt-4 text-[12px] text-white/22">
            Didn't receive the code?{" "}
            <button
              onClick={handleResend}
              className="text-red-400/75 hover:text-red-400 transition-colors"
            >
              Resend
            </button>
          </div>

          <div className="text-center mt-2 text-[12px] text-white/22">
            <Link
              href="/sign-up"
              className="text-white/30 hover:text-white/50 transition-colors"
            >
              ← Back to sign up
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

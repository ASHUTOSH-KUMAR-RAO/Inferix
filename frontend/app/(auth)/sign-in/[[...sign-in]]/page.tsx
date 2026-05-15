import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* LEFT PANEL */}
      <div
        className="hidden md:flex flex-col justify-between px-10 py-10 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, rgba(25,6,6,0.98) 0%, rgba(12,4,4,0.99) 100%)" }}
      >
        {/* Diagonal deco */}
        <div className="absolute inset-0 overflow-hidden opacity-35 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[55%] h-[130%] rounded-sm"
            style={{ background: "linear-gradient(to bottom,#7f0000,#3f0000)", transform: "skewX(-18deg)" }} />
          <div className="absolute -top-[20%] right-[8%] w-[30%] h-[130%] rounded-sm"
            style={{ background: "linear-gradient(to bottom,#5a0000,#2a0000)", transform: "skewX(-18deg)" }} />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 rounded-[6px]" />
          <span className="text-[15px] font-semibold text-white/90 tracking-[-0.4px]">Inferix</span>
        </div>

        {/* Mid */}
        <div className="relative z-10">
          <div className="text-[11px] text-red-400/70 tracking-[1px] uppercase mb-3">Local AI Platform</div>
          <h2 className="text-[clamp(20px,2.5vw,26px)] font-medium text-white/90 tracking-[-0.8px] leading-[1.25] mb-3">
            Run AI models.<br />
            <span className="text-white/20">Own your data.</span>
          </h2>
          <p className="text-[12px] text-white/28 leading-[1.65] mb-6">
            Inferix runs entirely on your machine. No API keys, no data leaving your hardware.
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
                  <strong className="text-white/60 font-medium">{s.val}</strong> {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[11px] text-white/15">
          Inferix · Built by Ashutosh Kumar Rao · 2026
        </div>
      </div>

      {/* RIGHT — Clerk SignIn */}
      <div className="flex items-center justify-center bg-[#0f0f0f] px-4 py-10 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-red-900/10 blur-[70px] pointer-events-none" />
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#ef4444",
              colorBackground: "#0f0f0f",
              colorInputBackground: "#1a1a1a",
              colorInputText: "rgba(255,255,255,0.72)",
              colorText: "rgba(255,255,255,0.85)",
              colorTextSecondary: "rgba(255,255,255,0.3)",
              colorNeutral: "rgba(255,255,255,0.1)",
              borderRadius: "100px",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "13px",
            },
            elements: {
              card: "bg-[#0f0f0f] shadow-none border-none",
              cardBox: "shadow-none border-none",
              headerTitle: "text-white/88 font-medium tracking-[-0.4px]",
              headerSubtitle: "text-white/28 text-[12px]",
              socialButtonsBlockButton: "bg-[#1a1a1a] border border-white/[0.09] rounded-full text-white/55 hover:bg-[#222] hover:border-white/20 hover:text-white/82 transition-all",
              socialButtonsBlockButtonText: "text-[12px] font-normal",
              dividerLine: "bg-white/[0.06]",
              dividerText: "text-white/18 text-[11px]",
              formFieldLabel: "text-white/32 text-[11px] tracking-[0.2px]",
              formFieldInput: "bg-[#1a1a1a] border border-white/[0.09] rounded-full text-white/72 text-[12px] focus:border-red-500/50 focus:bg-[#1f1010] transition-all",
              formButtonPrimary: "rounded-full text-[13px] font-medium tracking-[-0.2px] transition-all hover:-translate-y-[1px]",
              footerActionLink: "text-red-400/75 hover:text-red-400 transition-colors",
              footerActionText: "text-white/22 text-[12px]",
              footer: "bg-[#0f0f0f]",
              navbar: "hidden",
              rootBox: "w-full",
            },
          }}
        />
      </div>
    </main>
  );
}

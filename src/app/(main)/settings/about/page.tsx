"use client";

import { Info, Sparkles, Heart, Code2, Layers, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";

export default function AboutSettings() {
  const { theme } = useTheme();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-pink-100 pb-4">
        <h2 className="text-xl font-bold text-ink-900 mb-1">About Pinkspace</h2>
        <p className="text-ink-500 text-sm">
          Informasi versi, arsitektur framework, dan status workspace Anda.
        </p>
      </div>

      {/* Hero Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-500/15 via-rose-400/10 to-pink-500/15 border border-pink-200/80 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/30">
          <Sparkles size={32} />
        </div>
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="text-lg font-bold text-ink-900">Pinkspace Workspace</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white">
              v1.0.0 Stable
            </span>
          </div>
          <p className="text-xs text-ink-500 max-w-lg">
            Personal Developer Workspace — Command Center untuk seluruh resource kerja developer (Extension, Script, Assets, Prompt, & Blueprint).
          </p>
        </div>
      </div>

      {/* Specifications */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Code2 size={18} className="text-pink-500" />
          <h3>Spesifikasi Teknologi & Stack</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-pink-100 space-y-2">
            <div className="flex items-center gap-2 text-ink-900 font-semibold text-xs">
              <Layers size={15} className="text-pink-500" />
              <span>Core Framework & Runtime</span>
            </div>
            <div className="text-xs space-y-1 text-ink-600">
              <p>• Next.js 16.2 (App Router)</p>
              <p>• React 19 (Server & Client Components)</p>
              <p>• TypeScript 5</p>
              <p>• Tailwind CSS v4</p>
            </div>
          </div>

          <div className="p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-pink-100 space-y-2">
            <div className="flex items-center gap-2 text-ink-900 font-semibold text-xs">
              <Heart size={15} className="text-pink-500" />
              <span>Tema & Motion Active</span>
            </div>
            <div className="text-xs space-y-1 text-ink-600">
              <p>• Active Theme: <strong className="text-pink-600">{theme.name}</strong></p>
              <p>• Mood Signature: {theme.mood.join(", ")}</p>
              <p>• Particle Type: {theme.ambient.type}</p>
              <p>• Motion Profile: {theme.motion.easing.slice(0, 20)}...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="space-y-4 pt-4 border-t border-pink-100/60">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Info size={18} className="text-pink-500" />
          <h3>Status Compliance Blueprint & PRD</h3>
        </div>

        <div className="space-y-2">
          {[
            "Single Source of Truth (SSOT) Blueprint compliance verified.",
            "Living Theme Engine (5 pink-family themes) fully operational.",
            "Raycast-style Universal Search & Keyboard navigation ready.",
            "Dynamic Taxonomy Sidebar (auto-hide zero-count categories) active.",
            "Modular Admin Panel protected via Admin Auth.",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-ink-700 bg-white/40 p-2.5 rounded-xl border border-pink-100/40">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

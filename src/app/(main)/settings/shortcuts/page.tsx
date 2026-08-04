"use client";

import { Keyboard, Command, Sparkles } from "lucide-react";

export default function ShortcutsSettings() {
  const shortcuts = [
    { key: "Cmd + K  /  Ctrl + K", action: "Buka Universal Search Palette", scope: "Global" },
    { key: "/", action: "Fokus cepat ke kolom pencarian", scope: "Global" },
    { key: "Esc", action: "Tutup Modal Preview / Search Palette", scope: "Modal / Overlay" },
    { key: "Cmd + B  /  Ctrl + B", action: "Lipat / Buka Sidebar Navigasi", scope: "Workspace" },
    { key: "Cmd + F  /  Ctrl + F", action: "Filter cepat daftar resource", scope: "Halaman Resource" },
    { key: "Tab", action: "Pindah navigasi antar elemen kartu", scope: "Navigasi Keyboard" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-pink-100 pb-4">
        <h2 className="text-xl font-bold text-ink-900 mb-1">Keyboard Shortcuts Reference</h2>
        <p className="text-ink-500 text-sm">
          Daftar pintasan papan ketik (keyboard shortcuts) untuk navigasi cepat ala Raycast.
        </p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
            <Keyboard size={18} className="text-pink-500" />
            <h3>Pintasan Papan Ketik Utama</h3>
          </div>
          <span className="text-xs bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
            <Sparkles size={12} />
            <span>Raycast Navigation</span>
          </span>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-pink-100 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-pink-50/50 text-ink-900 font-semibold border-b border-pink-100">
              <tr>
                <th className="p-3.5">Pintasan (Keys)</th>
                <th className="p-3.5">Fungsi / Aksi</th>
                <th className="p-3.5">Cakupan (Scope)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100/60 text-ink-700">
              {shortcuts.map((sc, index) => (
                <tr key={index} className="hover:bg-pink-50/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-pink-600 flex items-center gap-1.5">
                    <Command size={13} />
                    <span>{sc.key}</span>
                  </td>
                  <td className="p-3.5 font-medium">{sc.action}</td>
                  <td className="p-3.5 text-ink-400">{sc.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

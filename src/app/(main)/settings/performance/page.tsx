"use client";

import { useState, useEffect } from "react";
import { Gauge, Cpu, Image, Zap, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SettingItem } from "@/components/ui/SettingItem";

export default function PerformanceSettings() {
  const [imageQuality, setImageQuality] = useState("auto");
  const [lazyLoading, setLazyLoading] = useState(true);
  const [memoryMode, setMemoryMode] = useState(false);
  const [cacheDuration, setCacheDuration] = useState("24h");

  useEffect(() => {
    const savedQuality = localStorage.getItem("pinkspace_image_quality");
    if (savedQuality) setImageQuality(savedQuality);

    const savedLazy = localStorage.getItem("pinkspace_lazy_loading");
    if (savedLazy !== null) setLazyLoading(savedLazy === "true");

    const savedMemory = localStorage.getItem("pinkspace_memory_mode");
    if (savedMemory !== null) setMemoryMode(savedMemory === "true");

    const savedCache = localStorage.getItem("pinkspace_cache_duration");
    if (savedCache) setCacheDuration(savedCache);
  }, []);

  const handleQualityChange = (val: string) => {
    setImageQuality(val);
    localStorage.setItem("pinkspace_image_quality", val);
  };

  const handleLazyToggle = (val: boolean) => {
    setLazyLoading(val);
    localStorage.setItem("pinkspace_lazy_loading", String(val));
  };

  const handleMemoryToggle = (val: boolean) => {
    setMemoryMode(val);
    localStorage.setItem("pinkspace_memory_mode", String(val));
  };

  const handleCacheChange = (val: string) => {
    setCacheDuration(val);
    localStorage.setItem("pinkspace_cache_duration", val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-pink-100 pb-4">
        <h2 className="text-xl font-bold text-ink-900 mb-1">Performance & Optimization</h2>
        <p className="text-ink-500 text-sm">
          Optimalkan kecepatan muat halaman, penggunaan memori, dan efisiensi gambar.
        </p>
      </div>

      {/* Media & Rendering */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Image size={18} className="text-pink-500" />
          <h3>Media & Muat Gambar</h3>
        </div>

        <SettingItem
          title="Kualitas Gambar Thumbnail (Image Quality)"
          description="Atur resolusi gambar thumbnail resource untuk menghemat kuota internet dan mempercepat rendering."
          recommended="Otomatis (Auto)"
        >
          <select
            value={imageQuality}
            onChange={(e) => handleQualityChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="auto">Otomatis (Tergantung Jaringan)</option>
            <option value="high">Kualitas Tinggi (High HD)</option>
            <option value="saver">Hemat Data (Data Saver)</option>
          </select>
        </SettingItem>

        <SettingItem
          title="Pemuatan Tunda Gambar (Lazy Loading)"
          description="Gambar dan preview hanya dimuat ketika muncul di dalam layar layar viewport pengguna."
          recommended="Aktif"
          tooltip="Sangat disarankan tetap aktif agar waktu buka halaman < 1.5 detik."
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={lazyLoading}
              onChange={(e) => handleLazyToggle(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>
      </section>

      {/* Memori & Cache */}
      <section className="space-y-4 pt-4 border-t border-pink-100/60">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Cpu size={18} className="text-pink-500" />
          <h3>Memori & Cache Client</h3>
        </div>

        <SettingItem
          title="Mode Hemat Memori (Low-End Devices)"
          description="Mengurangi animasi partikel ambient dan efek blur kaca secara otomatis untuk RAM terbatas."
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={memoryMode}
              onChange={(e) => handleMemoryToggle(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>

        <SettingItem
          title="Masa Simpan Cache Metadata"
          description="Berapa lama metadata pencarian dan kartu resource disimpan di cache lokal browser."
          recommended="24 Jam"
        >
          <select
            value={cacheDuration}
            onChange={(e) => handleCacheChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="1h">1 Jam</option>
            <option value="12h">12 Jam</option>
            <option value="24h">24 Jam (Rekomendasi)</option>
            <option value="7d">7 Hari</option>
          </select>
        </SettingItem>
      </section>

      {/* Cross-link to Appearance Motion Settings */}
      <section className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-200/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center shrink-0">
            <Zap size={18} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-ink-900">Ingin Mematikan Efek Animasi Heavy?</h4>
            <p className="text-xs text-ink-500">
              Atur tingkat intensivitas motion atau matikan animasi total melalui menu Appearance.
            </p>
          </div>
        </div>
        <Link
          href="/settings/appearance"
          className="shrink-0 text-xs font-medium text-pink-700 hover:text-pink-800 flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-pink-200 shadow-sm transition-all hover:shadow"
        >
          <span>Atur Motion</span>
          <ExternalLink size={14} />
        </Link>
      </section>
    </div>
  );
}

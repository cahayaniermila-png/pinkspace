"use client";

import { useState, useEffect } from "react";
import { LayoutGrid, Eye, Layout } from "lucide-react";
import { SettingItem } from "@/components/ui/SettingItem";

export default function DashboardSettings() {
  const [gridDensity, setGridDensity] = useState("comfortable");
  const [defaultPage, setDefaultPage] = useState("/dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [widgets, setWidgets] = useState({
    welcome: true,
    statistics: true,
    favorites: true,
    recent: true,
    collections: true,
  });

  useEffect(() => {
    const savedDensity = localStorage.getItem("pinkspace_grid_density");
    if (savedDensity) setGridDensity(savedDensity);

    const savedPage = localStorage.getItem("pinkspace_default_page");
    if (savedPage) setDefaultPage(savedPage);

    const savedSidebar = localStorage.getItem("pinkspace_sidebar_collapsed");
    if (savedSidebar !== null) setSidebarCollapsed(savedSidebar === "true");

    const savedWidgets = localStorage.getItem("pinkspace_dashboard_widgets");
    if (savedWidgets) {
      try {
        setWidgets(JSON.parse(savedWidgets));
      } catch (e) {
        // ignore parse error
      }
    }
  }, []);

  const handleDensityChange = (value: string) => {
    setGridDensity(value);
    localStorage.setItem("pinkspace_grid_density", value);
  };

  const handlePageChange = (value: string) => {
    setDefaultPage(value);
    localStorage.setItem("pinkspace_default_page", value);
  };

  const handleSidebarChange = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem("pinkspace_sidebar_collapsed", String(collapsed));
  };

  const toggleWidget = (key: keyof typeof widgets) => {
    const updated = { ...widgets, [key]: !widgets[key] };
    setWidgets(updated);
    localStorage.setItem("pinkspace_dashboard_widgets", JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-pink-100 pb-4">
        <h2 className="text-xl font-bold text-ink-900 mb-1">Dashboard Layout</h2>
        <p className="text-ink-500 text-sm">
          Sesuaikan tampilan widget, kepadatan grid, dan navigasi default di dashboard Anda.
        </p>
      </div>

      {/* Section 1: Layout & Density */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Layout size={18} className="text-pink-500" />
          <h3>Tata Letak & Navigasi</h3>
        </div>

        <SettingItem
          title="Kepadatan Grid (Card Density)"
          description="Mengatur jarak antar kartu resource dan ukuran grid di dashboard."
          recommended="Comfortable"
        >
          <select
            value={gridDensity}
            onChange={(e) => handleDensityChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="compact">Ringkas (Compact)</option>
            <option value="comfortable">Nyaman (Comfortable)</option>
            <option value="spacious">Luas (Spacious)</option>
          </select>
        </SettingItem>

        <SettingItem
          title="Halaman Default Awal"
          description="Halaman utama yang pertama kali dibuka saat mengakses workspace."
          recommended="Dashboard"
        >
          <select
            value={defaultPage}
            onChange={(e) => handlePageChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="/dashboard">Dashboard Utama</option>
            <option value="/resources">Semua Resources</option>
            <option value="/favorites">Favorites Saya</option>
          </select>
        </SettingItem>

        <SettingItem
          title="Status Sidebar Bawaan"
          description="Buka atau lipat sidebar utama secara otomatis saat halaman baru dimuat."
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={sidebarCollapsed}
              onChange={(e) => handleSidebarChange(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>
      </section>

      {/* Section 2: Widget Visibility */}
      <section className="space-y-4 pt-4 border-t border-pink-100/60">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Eye size={18} className="text-pink-500" />
          <h3>Visibilitas Widget Dashboard</h3>
        </div>
        <p className="text-xs text-ink-500">
          Pilih widget mana saja yang ingin Anda tampilkan di layar utama dashboard.
        </p>

        <div className="space-y-3">
          {[
            { key: "welcome", title: "Welcome Hero Section", desc: "Salam pembuka dan ringkasan workspace" },
            { key: "statistics", title: "Statistics Overview", desc: "Statistik total resource & kategori" },
            { key: "favorites", title: "Quick Favorites Grid", desc: "Barisan resource favorit untuk akses cepat" },
            { key: "recent", title: "Recently Added & Updated", desc: "Daftar resource yang baru ditambahkan" },
            { key: "collections", title: "My Collections Section", desc: "Grup koleksi buatan Anda" },
          ].map((w) => (
            <SettingItem
              key={w.key}
              title={w.title}
              description={w.desc}
            >
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={widgets[w.key as keyof typeof widgets]}
                  onChange={() => toggleWidget(w.key as keyof typeof widgets)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            </SettingItem>
          ))}
        </div>
      </section>
    </div>
  );
}

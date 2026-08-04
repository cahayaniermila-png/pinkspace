"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, SlidersHorizontal } from "lucide-react";
import { SettingItem } from "@/components/ui/SettingItem";
import { CATEGORIES } from "@/config/categories";

export default function SearchSettings() {
  const [recentSearchEnabled, setRecentSearchEnabled] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState(true);
  const [autoComplete, setAutoComplete] = useState(true);
  const [highlightResult, setHighlightResult] = useState(true);
  const [defaultCategory, setDefaultCategory] = useState("all");

  useEffect(() => {
    const savedRecent = localStorage.getItem("pinkspace_recent_search_enabled");
    if (savedRecent !== null) setRecentSearchEnabled(savedRecent === "true");

    const savedSuggestions = localStorage.getItem("pinkspace_search_suggestions");
    if (savedSuggestions !== null) setSearchSuggestions(savedSuggestions === "true");

    const savedAutoComplete = localStorage.getItem("pinkspace_search_autocomplete");
    if (savedAutoComplete !== null) setAutoComplete(savedAutoComplete === "true");

    const savedHighlight = localStorage.getItem("pinkspace_search_highlight");
    if (savedHighlight !== null) setHighlightResult(savedHighlight === "true");

    const savedDefaultCat = localStorage.getItem("pinkspace_default_search_category");
    if (savedDefaultCat) setDefaultCategory(savedDefaultCat);
  }, []);

  const handleToggle = (key: string, value: boolean, setter: (val: boolean) => void) => {
    setter(value);
    localStorage.setItem(key, String(value));
  };

  const handleCategoryChange = (catSlug: string) => {
    setDefaultCategory(catSlug);
    localStorage.setItem("pinkspace_default_search_category", catSlug);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-pink-100 pb-4">
        <h2 className="text-xl font-bold text-ink-900 mb-1">Search Settings</h2>
        <p className="text-ink-500 text-sm">
          Konfigurasi perilaku Raycast-style Universal Search palette (Cmd+K).
        </p>
      </div>

      {/* Perilaku Pencarian */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Search size={18} className="text-pink-500" />
          <h3>Perilaku & Riwayat Pencarian</h3>
        </div>

        <SettingItem
          title="Simpan Riwayat Pencarian (Recent Searches)"
          description="Menyimpan kata kunci pencarian terakhir Anda untuk pencarian cepat berikutnya di modal Cmd+K."
          recommended="Aktif"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={recentSearchEnabled}
              onChange={(e) =>
                handleToggle(
                  "pinkspace_recent_search_enabled",
                  e.target.checked,
                  setRecentSearchEnabled
                )
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>

        <SettingItem
          title="Saran Pencarian (Search Suggestions)"
          description="Tampilkan ide pencarian populer dan kategori yang disarankan saat kotak pencarian masih kosong."
          recommended="Aktif"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={searchSuggestions}
              onChange={(e) =>
                handleToggle(
                  "pinkspace_search_suggestions",
                  e.target.checked,
                  setSearchSuggestions
                )
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>

        <SettingItem
          title="Autocomplete Otomatis"
          description="Melengkapi kata kunci secara otomatis saat Anda mengetik nama resource atau tag."
          recommended="Aktif"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoComplete}
              onChange={(e) =>
                handleToggle(
                  "pinkspace_search_autocomplete",
                  e.target.checked,
                  setAutoComplete
                )
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>

        <SettingItem
          title="Sorot Hasil Pencarian (Highlight Keyword)"
          description="Beri warna aksen stabilo pada teks judul/deskripsi yang cocok dengan katakunci pencarian."
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={highlightResult}
              onChange={(e) =>
                handleToggle(
                  "pinkspace_search_highlight",
                  e.target.checked,
                  setHighlightResult
                )
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>
      </section>

      {/* Scope Default */}
      <section className="space-y-4 pt-4 border-t border-pink-100/60">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <SlidersHorizontal size={18} className="text-pink-500" />
          <h3>Scope Kategori Bawaan</h3>
        </div>

        <SettingItem
          title="Scope Kategori Awal"
          description="Pilih kategori awal yang langsung terpilih ketika Anda pertama kali membuka Search Palette (Cmd+K)."
          recommended="Semua Kategori"
        >
          <select
            value={defaultCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="all">Semua Kategori (Global)</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.icon} {cat.displayName}
              </option>
            ))}
          </select>
        </SettingItem>
      </section>
    </div>
  );
}

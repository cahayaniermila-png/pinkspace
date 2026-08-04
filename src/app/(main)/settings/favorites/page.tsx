"use client";

import { useState, useEffect } from "react";
import { Heart, Library, Sliders } from "lucide-react";
import { SettingItem } from "@/components/ui/SettingItem";

export default function FavoritesSettings() {
  const [favoriteSorting, setFavoriteSorting] = useState("recent");
  const [autoFavorite, setAutoFavorite] = useState(false);
  const [autoThreshold, setAutoThreshold] = useState("5");
  const [defaultCollection, setDefaultCollection] = useState("none");

  useEffect(() => {
    const savedSorting = localStorage.getItem("pinkspace_favorite_sorting");
    if (savedSorting) setFavoriteSorting(savedSorting);

    const savedAutoFav = localStorage.getItem("pinkspace_auto_favorite");
    if (savedAutoFav !== null) setAutoFavorite(savedAutoFav === "true");

    const savedThreshold = localStorage.getItem("pinkspace_auto_favorite_threshold");
    if (savedThreshold) setAutoThreshold(savedThreshold);

    const savedCollection = localStorage.getItem("pinkspace_default_collection");
    if (savedCollection) setDefaultCollection(savedCollection);
  }, []);

  const handleSortingChange = (val: string) => {
    setFavoriteSorting(val);
    localStorage.setItem("pinkspace_favorite_sorting", val);
  };

  const handleAutoFavoriteToggle = (val: boolean) => {
    setAutoFavorite(val);
    localStorage.setItem("pinkspace_auto_favorite", String(val));
  };

  const handleThresholdChange = (val: string) => {
    setAutoThreshold(val);
    localStorage.setItem("pinkspace_auto_favorite_threshold", val);
  };

  const handleCollectionChange = (val: string) => {
    setDefaultCollection(val);
    localStorage.setItem("pinkspace_default_collection", val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-pink-100 pb-4">
        <h2 className="text-xl font-bold text-ink-900 mb-1">Favorites & Collections Settings</h2>
        <p className="text-ink-500 text-sm">
          Atur urutan bawaan dan perilaku pengelompokan resource favorit Anda.
        </p>
      </div>

      {/* Perilaku Favorites */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Heart size={18} className="text-pink-500" />
          <h3>Pengurutan & Otomatisasi Favorites</h3>
        </div>

        <SettingItem
          title="Pengurutan Bawaan (Default Sorting)"
          description="Pilih bagaimana daftar resource favorit diurutkan saat pertama kali membuka halaman Favorites."
          recommended="Baru Difavoritkan"
        >
          <select
            value={favoriteSorting}
            onChange={(e) => handleSortingChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="recent">Baru Difavoritkan (Recently Favorited)</option>
            <option value="alphabetical">Abjad (A - Z)</option>
            <option value="most-opened">Paling Sering Dibuka</option>
          </select>
        </SettingItem>

        <SettingItem
          title="Otomatis Favoritkan (Auto-Favorite)"
          description="Tandai resource sebagai favorit secara otomatis jika Anda telah membukanya berkali-kali."
          tooltip="Membantu Anda menemukan resource yang paling sering digunakan tanpa manual menekan tombol love."
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoFavorite}
              onChange={(e) => handleAutoFavoriteToggle(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>

        {autoFavorite && (
          <SettingItem
            title="Ambang Akses Auto-Favorite"
            description="Berapa kali suatu resource harus dibuka sebelum otomatis dijadikan favorit."
            recommended="5 Kali"
          >
            <select
              value={autoThreshold}
              onChange={(e) => handleThresholdChange(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="3">3 Kali Dibuka</option>
              <option value="5">5 Kali Dibuka</option>
              <option value="10">10 Kali Dibuka</option>
            </select>
          </SettingItem>
        )}
      </section>

      {/* Preferensi Collections */}
      <section className="space-y-4 pt-4 border-t border-pink-100/60">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Library size={18} className="text-pink-500" />
          <h3>Koleksi Bawaan (Default Collection)</h3>
        </div>

        <SettingItem
          title="Koleksi Target Otomatis"
          description="Saat Anda menyukai resource, masukkan juga secara otomatis ke dalam grup koleksi utama ini."
          recommended="Tanpa Koleksi Utama"
        >
          <select
            value={defaultCollection}
            onChange={(e) => handleCollectionChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="none">Tanpa Koleksi Utama (Manual)</option>
            <option value="daily-tools">Daily Tools</option>
            <option value="project-alpha">Project Alpha</option>
          </select>
        </SettingItem>
      </section>
    </div>
  );
}

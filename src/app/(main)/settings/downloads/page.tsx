"use client";

import { useState, useEffect } from "react";
import { Download, ShieldCheck } from "lucide-react";
import { SettingItem } from "@/components/ui/SettingItem";

export default function DownloadsSettings() {
  const [downloadConfirmation, setDownloadConfirmation] = useState(true);
  const [autoDownload, setAutoDownload] = useState(false);
  const [openInNewTab, setOpenInNewTab] = useState(true);
  const [downloadSpeedLimit, setDownloadSpeedLimit] = useState("unlimited");

  useEffect(() => {
    const savedConfirm = localStorage.getItem("pinkspace_download_confirmation");
    if (savedConfirm !== null) setDownloadConfirmation(savedConfirm === "true");

    const savedAuto = localStorage.getItem("pinkspace_auto_download");
    if (savedAuto !== null) setAutoDownload(savedAuto === "true");

    const savedNewTab = localStorage.getItem("pinkspace_download_new_tab");
    if (savedNewTab !== null) setOpenInNewTab(savedNewTab === "true");

    const savedSpeed = localStorage.getItem("pinkspace_download_speed");
    if (savedSpeed) setDownloadSpeedLimit(savedSpeed);
  }, []);

  const handleToggle = (key: string, value: boolean, setter: (v: boolean) => void) => {
    setter(value);
    localStorage.setItem(key, String(value));
  };

  const handleSpeedChange = (val: string) => {
    setDownloadSpeedLimit(val);
    localStorage.setItem("pinkspace_download_speed", val);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="border-b border-pink-100 pb-4">
        <h2 className="text-xl font-bold text-ink-900 mb-1">Downloads Settings</h2>
        <p className="text-ink-500 text-sm">
          Pengaturan perilaku unduhan untuk resource bertipe file (`type: FILE`).
        </p>
      </div>

      {/* Perilaku Unduhan */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <Download size={18} className="text-pink-500" />
          <h3>Perilaku Penanganan File</h3>
        </div>

        <SettingItem
          title="Konfirmasi Sebelum Mengunduh"
          description="Tampilkan dialog konfirmasi sebelum memulai pengunduhan file dari workspace."
          recommended="Aktif"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={downloadConfirmation}
              onChange={(e) =>
                handleToggle(
                  "pinkspace_download_confirmation",
                  e.target.checked,
                  setDownloadConfirmation
                )
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>

        <SettingItem
          title="Unduh Otomatis (Auto Download)"
          description="Langsung mengunduh file begitu tombol rincian resource ditekan."
          tooltip="Hanya disarankan jika Anda ingin proses satu-klik tanpa konfirmasi tambahan."
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoDownload}
              onChange={(e) =>
                handleToggle(
                  "pinkspace_auto_download",
                  e.target.checked,
                  setAutoDownload
                )
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>

        <SettingItem
          title="Buka Pratinjau di Tab Baru"
          description="Buka berkas dokumen, gambar, atau PDF di tab browser baru sebelum memutuskan mengunduh."
          recommended="Aktif"
        >
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={openInNewTab}
              onChange={(e) =>
                handleToggle(
                  "pinkspace_download_new_tab",
                  e.target.checked,
                  setOpenInNewTab
                )
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </SettingItem>
      </section>

      {/* Keamanan & Lokasi */}
      <section className="space-y-4 pt-4 border-t border-pink-100/60">
        <div className="flex items-center gap-2 text-ink-900 font-semibold text-sm">
          <ShieldCheck size={18} className="text-pink-500" />
          <h3>Keamanan & Bandwidth</h3>
        </div>

        <SettingItem
          title="Batas Kecepatan Unduh (Bandwidth Throttling)"
          description="Batasi kecepatan pengunduhan agar tidak mengganggu lalu lintas jaringan lain."
          recommended="Tanpa Batas"
        >
          <select
            value={downloadSpeedLimit}
            onChange={(e) => handleSpeedChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-pink-200 rounded-xl text-ink-900 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="unlimited">Tanpa Batas (Maksimal)</option>
            <option value="5mbps">Batasi 5 Mbps</option>
            <option value="2mbps">Batasi 2 Mbps</option>
          </select>
        </SettingItem>
      </section>
    </div>
  );
}

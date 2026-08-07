"use client";

import { useState } from "react";
import { Info, X, ExternalLink } from "lucide-react";

export default function UploadHelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-700 transition-colors shadow-sm"
        title="Cara Upload File"
      >
        <Info size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-pink-100 bg-gradient-to-r from-pink-50/50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">
                  <Info size={20} />
                </div>
                <h2 className="text-xl font-bold text-ink-900">Panduan Upload File (External)</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-pink-50 flex items-center justify-center text-ink-400 hover:text-pink-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto space-y-8">
              {/* Google Drive */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">1</span>
                  <h3 className="text-lg font-bold text-ink-900">Menggunakan Google Drive (Paling Mudah)</h3>
                </div>
                <p className="text-sm text-ink-500 ml-8">Jika Anda punya file .zip atau dokumen lain, ini cara terbaiknya:</p>
                <div className="ml-8 space-y-3 text-sm text-ink-700">
                  <div className="p-4 rounded-2xl border border-pink-100 bg-pink-50/30">
                    <ol className="list-decimal list-outside ml-4 space-y-2">
                      <li>Buka <a href="https://drive.google.com/" target="_blank" rel="noreferrer" className="text-pink-600 font-semibold hover:underline inline-flex items-center gap-1">Google Drive <ExternalLink size={12}/></a> dan <strong>upload (unggah)</strong> file Anda.</li>
                      <li>Setelah selesai, <strong>klik kanan</strong> pada file tersebut dan pilih menu <strong>Bagikan (Share)</strong> &rarr; lalu klik <strong>Bagikan</strong>.</li>
                      <li>Pada bagian <strong>Akses Umum (General Access)</strong>, ubah pengaturan dari <em>Dibatasi (Restricted)</em> menjadi <strong className="text-pink-600">Siapa saja yang memiliki link (Anyone with the link)</strong>. (Sangat penting agar bisa didownload).</li>
                      <li>Pastikan peran di sebelahnya adalah <strong>Pelihat (Viewer)</strong>.</li>
                      <li>Klik tombol <strong>Salin link (Copy link)</strong>.</li>
                      <li>Tutup panduan ini, lalu <strong>Paste (Tempel)</strong> link tersebut ke dalam kolom <strong>External URL</strong> di form.</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* GitHub */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-ink-800 text-white flex items-center justify-center text-xs font-bold">2</span>
                  <h3 className="text-lg font-bold text-ink-900">Menggunakan GitHub (Untuk Kode/Script)</h3>
                </div>
                <p className="text-sm text-ink-500 ml-8">Jika Anda mengupload script (.js / .user.js) atau release:</p>
                <div className="ml-8 space-y-3 text-sm text-ink-700">
                  <div className="p-4 rounded-2xl border border-pink-100 bg-pink-50/30">
                    <ol className="list-decimal list-outside ml-4 space-y-2">
                      <li>Buka halaman file script Anda di repositori GitHub (pastikan repositori berstatus Public).</li>
                      <li>Di pojok kanan atas kotak kode, cari dan klik tombol <strong>Raw</strong>.</li>
                      <li>Browser akan menampilkan kode mentah. <strong>Copy (Salin) URL</strong> yang ada di address bar browser Anda (biasanya berawalan <code>raw.githubusercontent.com</code>).</li>
                      <li>Paste link tersebut ke kolom <strong>External URL</strong>.</li>
                    </ol>
                  </div>
                  <div className="mt-4 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-xs text-blue-800">
                      <strong>Catatan untuk .zip di GitHub Releases:</strong><br/>
                      Jika Anda membuat Release, cukup klik kanan pada tombol download file .zip di bagian Assets, lalu pilih <strong>Copy link address (Salin alamat link)</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-pink-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-pink-600 shadow-sm hover:shadow-md transition-all"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

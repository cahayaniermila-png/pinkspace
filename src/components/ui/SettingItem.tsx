"use client";

import React from "react";
import { HelpCircle } from "lucide-react";

interface SettingItemProps {
  title: string;
  description: string;
  children: React.ReactNode;
  recommended?: string;
  tooltip?: string;
  badge?: string;
}

export function SettingItem({
  title,
  description,
  children,
  recommended,
  tooltip,
  badge,
}: SettingItemProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-pink-100/60 shadow-sm gap-4 transition-all duration-200 hover:border-pink-200">
      <div className="space-y-1 flex-1 pr-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-semibold text-sm text-ink-900">{title}</h4>
          {badge && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
              {badge}
            </span>
          )}
          {recommended && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              Rekomendasi: {recommended}
            </span>
          )}
        </div>
        <p className="text-xs text-ink-500 leading-relaxed">{description}</p>
        {tooltip && (
          <div className="flex items-center gap-1 text-[11px] text-pink-600/80 pt-0.5">
            <HelpCircle size={12} className="shrink-0" />
            <span>{tooltip}</span>
          </div>
        )}
      </div>

      <div className="shrink-0 flex items-center justify-start sm:justify-end">
        {children}
      </div>
    </div>
  );
}

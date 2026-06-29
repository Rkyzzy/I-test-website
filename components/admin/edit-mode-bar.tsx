"use client";

import { Loader2, Save, X } from "lucide-react";

interface EditModeBarProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function EditModeBar({ onSave, onCancel, isSaving }: EditModeBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] bg-deck-800/90 backdrop-blur-lg border-t border-accent/30 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-signal animate-pulse" />
          <span className="text-sm font-medium text-signal">编辑模式</span>
          <span className="text-xs text-deck-400">离开编辑模式前别忘记保存</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl text-xs font-medium text-deck-300 border border-deck-600 hover:border-deck-400 hover:text-deck-100 transition-colors disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5 inline mr-1" />
            取消
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-signal text-deck-950 hover:bg-signal/90 transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            保存
          </button>
        </div>
      </div>
    </div>
  );
}

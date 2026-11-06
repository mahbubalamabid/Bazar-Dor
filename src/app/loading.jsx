import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-3 bg-slate-50">
      <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-semibold text-slate-500 animate-pulse">
        বাজারের তথ্য লোড হচ্ছে...
      </p>
    </div>
  );
}


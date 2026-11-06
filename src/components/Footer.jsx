import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛒</span>
          <p className="font-semibold text-white">
            বাজার দর <span className="text-slate-400 font-normal">— প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
          </p>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 italic">
          &ldquo;সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।&rdquo;
        </p>
      </div>
    </footer>
  );
}


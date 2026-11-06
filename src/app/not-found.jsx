import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] w-full flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full text-center space-y-5 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xs">
        <span className="text-6xl sm:text-7xl block animate-bounce">🛒</span>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-xs border border-rose-100">
            ৪০৪ — পেজ পাওয়া যায়নি
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            আপনি যে পণ্য, ক্যাটাগরি বা পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা
            ভুল লিঙ্ক ব্যবহার করা হয়েছে।
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-xs transition-colors"
          >
            <Home size={16} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </main>
  );
}


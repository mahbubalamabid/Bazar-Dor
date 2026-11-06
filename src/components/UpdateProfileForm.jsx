"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, User, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";

export default function UpdateProfileForm({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("অনুগ্রহ করে একটি বৈধ নাম লিখুন");
      return;
    }

    setLoading(true);
    try {
      const res = await updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        toast.error(res.error.message || "তথ্য আপডেট ব্যর্থ হয়েছে");
      } else {
        toast.success("প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হচ্ছে। পুনরায় চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] flex flex-col items-center">
      <div className="w-full flex justify-start mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          তথ্য পরিবর্তন
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          আপনার প্রোফাইলের নাম হালনাগাদ করুন
        </p>
      </div>

      <div className="w-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs sm:text-sm font-semibold text-slate-400">
              ইমেইল অ্যাড্রেস (পরিবর্তনযোগ্য নয়)
            </label>
            <div className="relative flex items-center">
              <Mail
                size={18}
                className="pointer-events-none absolute left-3.5 text-slate-400"
              />
              <input
                type="email"
                disabled
                readOnly
                value={user?.email || ""}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-500 cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs sm:text-sm font-bold text-slate-800">
              পূর্ণ নাম
            </label>
            <div className="relative flex items-center">
              <User
                size={18}
                className="pointer-events-none absolute left-3.5 text-slate-400"
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:bg-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>সংরক্ষণ করা হচ্ছে...</span>
              </>
            ) : (
              <>
                <Check size={16} />
                <span>তথ্য আপডেট করুন</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


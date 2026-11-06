import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Pencil,
  ArrowLeft,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getBengaliDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "ব্যবহারকারী প্রোফাইল — বাজার দর",
  description: "আপনার বাজার দর অ্যাকাউন্ট তথ্য ও সেটিংস পরিচালনা করুন।",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile");
  }

  const { user } = session;
  const createdAtBn = user.createdAt
    ? getBengaliDate(user.createdAt)
    : "সদস্য";

  return (
    <main className="min-h-screen w-full py-8 sm:py-14 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
            <div className="w-20 h-20 rounded-full bg-emerald-600 text-white font-black text-3xl flex items-center justify-center shadow-md overflow-hidden shrink-0">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name || "ব্যবহারকারী"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{(user.name || "U")[0].toUpperCase()}</span>
              )}
            </div>

            <div className="space-y-1 flex-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {user.name || "সম্মানিত ব্যবহারকারী"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                <Mail size={14} className="text-slate-400" />
                <span>{user.email}</span>
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                  <ShieldCheck size={13} />
                  <span>যাচাইকৃত অ্যাকাউন্ট</span>
                </span>
              </div>
            </div>

            <Link
              href="/profile/update-profile"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm border border-emerald-200 transition-colors shrink-0"
            >
              <Pencil size={14} />
              <span>তথ্য পরিবর্তন</span>
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              অ্যাকাউন্টের ব্যক্তিগত তথ্য
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <User size={13} />
                  <span>পূর্ণ নাম</span>
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  {user.name || "নাম নেই"}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Mail size={13} />
                  <span>ইমেইল অ্যাড্রেস</span>
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1 truncate">
                  {user.email}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 sm:col-span-2">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Calendar size={13} />
                  <span>সদস্য হিসেবে যোগদানের তারিখ</span>
                </span>
                <p className="text-sm font-bold text-slate-800 mt-1">
                  {createdAtBn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


import React from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import {
  Home,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Calculator,
  CheckCircle2,
  Calendar,
  Building2,
  MapPin,
  Clock,
} from "lucide-react";
import { auth } from "@/lib/auth";
import {
  toBengaliNumber,
  getUnitLabelBn,
  calculateMarketStats,
} from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return { title: "পণ্য পাওয়া যায়নি — বাজার দর" };
    const product = await res.json();
    return {
      title: `${product.nameBn} আজকের বাজার দর — বাজার দর`,
      description: `${product.nameBn}-এর আজকের সর্বনিম্ন, সর্বোচ্চ ও গড় বাজার দর এবং বিভিন্ন বাজারের তুলনামূলক চিত্র।`,
    };
  } catch {
    return { title: "পণ্য বিবরণী — বাজার দর" };
  }
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/signin?callbackUrl=/product/${id}`);
  }

  let product = null;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      product = await res.json();
    }
  } catch (err) {
    console.error("Error fetching product details:", err);
  }

  if (!product || !product.nameBn) {
    notFound();
  }
  const markets = Array.isArray(product.markets) ? product.markets : [];

  const stats = calculateMarketStats(markets);
  const unitBn = getUnitLabelBn(product.unit);
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const sortedMarkets = [...markets].sort(
    (a, b) => Number(a.min) - Number(b.min)
  );

  return (
    <main className="min-h-screen w-full py-6 sm:py-10 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-500"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-emerald-700 transition-colors"
          >
            <Home size={14} />
            <span>হোম</span>
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/category/${product.category}`}
            className="flex items-center gap-1 hover:text-emerald-700 transition-colors"
          >
            <span>{product.categoryIcon}</span>
            <span>{product.categoryNameBn || product.category}</span>
          </Link>
          <ChevronRight size={14} />
          <span className="font-bold text-slate-900">{product.nameBn}</span>
        </nav>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-2xs">
                {product.image || "📦"}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100">
                    {product.categoryNameBn || product.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-xs">
                    {unitBn}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {product.nameBn}
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  দেশের {toBengaliNumber(markets.length)}টি প্রধান বাজারের
                  হালনাগাদ মূল্য বিশ্লেষণ
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-4 flex flex-col md:items-end shrink-0">
              <span className="text-[11px] font-medium text-slate-400">
                আজকের গড় বেঞ্চমার্ক দর
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {toBengaliNumber(product.today)} টাকা
                </span>
                <span className="text-xs font-medium text-slate-500">
                  / {unitBn.replace("প্রতি ", "")}
                </span>
              </div>

              <span
                className={`mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1 border ${isUp
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : isDown
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}
              >
                {isUp ? "▲ " : isDown ? "▼ " : "— "}
                {toBengaliNumber(Math.abs(product.change?.pct || 0))}%
              </span>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">আজকের দর</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {toBengaliNumber(product.today)} টাকা
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">গতকালের দর</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {toBengaliNumber(product.yesterday)} টাকা
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  গত সপ্তাহের দর
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {toBengaliNumber(product.lastWeek)} টাকা
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">গত মাসের দর</p>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {toBengaliNumber(product.lastMonth)} টাকা
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-3xl p-5 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-emerald-900">
                সর্বনিম্ন বাজার দর
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingDown size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800">
              {toBengaliNumber(stats.min)} টাকা
            </div>
            <p className="text-xs font-semibold text-emerald-700">
              বাজার: {stats.lowestMarket?.market || "নির্ধারিত নয়"} (
              {stats.lowestMarket?.division || "—"})
            </p>
          </div>

          <div className="bg-rose-50/60 border border-rose-200/90 rounded-3xl p-5 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-rose-900">
                সর্বোচ্চ বাজার দর
              </span>
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-900">
              {toBengaliNumber(stats.max)} টাকা
            </div>
            <p className="text-xs font-semibold text-rose-700">
              সর্বোচ্চ খুচরা বিক্রয় মূল্য সীমা
            </p>
          </div>

          <div className="bg-sky-50/60 border border-sky-200/90 rounded-3xl p-5 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-sky-900">
                গড় বাজার দর (মিডপয়েন্ট)
              </span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <Calculator size={16} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-sky-900">
              {toBengaliNumber(stats.avg)} টাকা
            </div>
            <p className="text-xs font-semibold text-sky-700">
              {toBengaliNumber(markets.length)}টি বাজারের গড় হিসাব (Option C)
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                বিভিন্ন পাইকারি ও খুচরা বাজারের সর্বনিম্ন ও সর্বোচ্চ দরের তুলনামূলক তালিকা
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto">
              <CheckCircle2 size={14} />
              <span>সেরা দর চিহ্নিত করা হয়েছে</span>
            </span>
          </div>

          <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-y border-slate-100 text-xs font-bold text-slate-400 bg-slate-50/70">
                    <th className="py-3 px-4">বাজার</th>
                    <th className="py-3 px-4">বিভাগ</th>
                    <th className="py-3 px-4 text-right">সর্বনিম্ন</th>
                    <th className="py-3 px-4 text-right">সর্বোচ্চ</th>
                    <th className="py-3 px-4 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {sortedMarkets.map((m, idx) => {
                    const isLowest = Number(m.min) === stats.min;
                    const marketMidpoint = Math.round(
                      (Number(m.min) + Number(m.max)) / 2
                    );

                    return (
                      <tr
                        key={`${m.market}-${m.division}-${idx}`}
                        className={
                          isLowest
                            ? "bg-emerald-50/60 font-medium"
                            : "hover:bg-slate-50/80 transition-colors"
                        }
                      >
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <Building2 size={15} className="text-slate-400 shrink-0" />
                          <span>{m.market}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="inline-flex items-center gap-1 text-xs bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                            <MapPin size={12} className="text-slate-400" />
                            <span>{m.division}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700">
                          {toBengaliNumber(m.min)} টাকা
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-rose-600">
                          {toBengaliNumber(m.max)} টাকা
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-700">
                          {toBengaliNumber(marketMidpoint)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              * বাজারভেদে পণ্যমান ও পরিমাণের ওপর ভিত্তি করে খুচরা মূল্যে সামান্য তারতম্য হতে পারে।
            </span>
            <span>মুদ্রা: BDT (বাংলাদেশি টাকা)</span>
          </div>
        </div>
      </div>
    </main>
  );
}


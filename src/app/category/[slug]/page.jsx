import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { toBengaliNumber } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return { title: "ক্যাটাগরি পাওয়া যায়নি — বাজার দর" };
    const category = await res.json();
    return {
      title: `${category.nameBn} বাজার দর — বাজার দর`,
      description: `${category.nameBn} ক্যাটাগরির সকল পণ্যের আজকের হালনাগাদ বাজার দর।`,
    };
  } catch {
    return { title: "ক্যাটাগরি — বাজার দর" };
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  let category = null;
  try {
    const catRes = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/categories/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (catRes.ok) {
      category = await catRes.json();
    }
  } catch (err) {
    console.error("Error fetching category:", err);
  }

  if (!category || !category.nameBn) {
    notFound();
  }

  let products = [];
  try {
    const prodRes = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
      { next: { revalidate: 60 } }
    );
    if (prodRes.ok) {
      const data = await prodRes.json();
      if (Array.isArray(data)) {
        products = data;
      }
    }
  } catch (err) {
    console.error("Error fetching category products:", err);
  }

  return (
    <main className="min-h-screen w-full py-8 sm:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <nav
          aria-label="ব্রেডক্রাম্ব"
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium"
        >
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            হোম
          </Link>
          <span>/</span>
          <span className="text-slate-400">ক্যাটাগরি</span>
          <span>/</span>
          <span className="text-emerald-800 font-semibold">
            {category.nameBn}
          </span>
        </nav>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex items-center gap-5 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-2xs">
            {category.icon || "🧺"}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {category.nameBn}
              </h1>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-100">
                মোট পণ্য: {toBengaliNumber(products.length)}টি
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {category.nameBn} ক্যাটাগরির আওতাভুক্ত সকল পণ্যের বাজারভিত্তিক
              দরদাম তালিকা
            </p>
          </div>
        </div>

        <CategoryProducts products={products} />
      </div>
    </main>
  );
}


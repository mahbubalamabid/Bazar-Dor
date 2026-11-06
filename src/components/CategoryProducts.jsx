"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/utils";

export default function CategoryProducts({ products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products];
  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => Number(a.today) - Number(b.today));
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => Number(b.today) - Number(a.today));
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          মোট{" "}
          <span className="font-bold text-emerald-700">
            {toBengaliNumber(products.length)}টি
          </span>{" "}
          পণ্যের মূল্য তালিকা
        </p>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700">
            <ArrowUpDown size={15} className="text-emerald-600" />
            <span>সাজান:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-xs">
          <span className="text-5xl block mb-3">🧺</span>
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য তালিকাভুক্ত নেই। অনুগ্রহ করে অন্য
            ক্যাটাগরি অনুসন্ধান করুন।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xs transition-colors"
          >
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}


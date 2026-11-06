"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import ProductCard from "./ProductCard";

export default function PriceRisersSection({ initialProducts = [] }) {
  const [risers, setRisers] = useState([]);
  const [loading, setLoading] = useState(initialProducts.length === 0);

  useEffect(() => {
    if (initialProducts.length > 0) {
      const filtered = [...initialProducts]
        .filter((item) => item.change?.dir === "up")
        .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
        .slice(0, 6);
      setRisers(filtered);
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function fetchRisers() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            const filtered = data
              .filter((item) => item.change?.dir === "up")
              .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
              .slice(0, 6);
            setRisers(filtered);
          }
        }
      } catch (err) {
        console.error("Failed to load risers:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchRisers();
    return () => {
      isMounted = false;
    };
  }, [initialProducts]);

  return (
    <section className="w-full py-10 sm:py-14 bg-rose-50/30 border-b border-rose-100/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div className="flex flex-col items-start gap-1.5">
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 border border-rose-200">
              <TrendingUp size={14} className="shrink-0" />
              <span>মূল্য বৃদ্ধি</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <span>আজ দাম বেড়েছে</span>
              <span className="text-rose-600 text-xl sm:text-2xl">▲</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              আজকের বাজারে যেসব নিত্যপণ্যের দাম সর্বাধিক বৃদ্ধি পেয়েছে (শীর্ষ ৬টি পণ্য)
            </p>
          </div>

          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            বৃদ্ধির হার অনুসারে সাজানো
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-48 rounded-2xl bg-slate-200/70 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


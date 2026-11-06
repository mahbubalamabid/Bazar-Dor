"use client";

import React, { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import ProductCard from "./ProductCard";
import { toBengaliNumber } from "@/lib/utils";

export default function AllProductsSection({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(initialProducts.length === 0);

  useEffect(() => {
    if (initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function loadProducts() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error("Failed to load all products:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [initialProducts]);

  return (
    <section id="সব-পণ্য" className="w-full py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div className="flex flex-col items-start gap-1.5">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 border border-emerald-200">
              <LayoutGrid size={14} className="shrink-0" />
              <span>সম্পূর্ণ তালিকা</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              সকল পণ্য
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              সারা দেশের বাজার থেকে সংগৃহীত নিত্যপ্রয়োজনীয় পণ্যের পূর্ণাঙ্গ মূল্য তালিকা
            </p>
          </div>

          <span className="text-xs sm:text-sm text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shrink-0">
            মোট {toBengaliNumber(products.length)}টি পণ্য পাওয়া গেছে
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(9)].map((_, idx) => (
              <div
                key={idx}
                className="h-52 rounded-2xl bg-slate-200/70 animate-pulse border border-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


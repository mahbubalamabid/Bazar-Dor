"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { toBengaliNumber, UNIT_MAP } from "@/lib/utils";

export default function Marque() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        console.error("Failed to load ticker data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || products.length === 0) {
    return (
      <div className="w-full bg-slate-900 text-slate-300 h-10 flex items-center px-4 text-xs font-medium border-b border-slate-800">
        <span className="animate-pulse">বাজারের লাইভ দর লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 text-slate-100 flex items-center h-10 overflow-hidden border-b border-slate-800 select-none">
      <Marquee
        pauseOnHover={true}
        speed={45}
        gradient={false}
        className="flex items-center h-full overflow-hidden"
      >
        {products.map((item) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";
          const unitBn = UNIT_MAP[item.unit] || item.unit || "একক";
          const priceBn = toBengaliNumber(item.today);
          const pctBn = toBengaliNumber(item.change?.pct || 0);

          return (
            <Link
              key={item.id}
              href={`/product/${item.id}`}
              className="inline-flex items-center gap-2 mx-4 text-xs hover:text-emerald-400 transition-colors cursor-pointer group"
            >
              <span className="text-sm">{item.image || "📦"}</span>
              <span className="font-semibold text-slate-200 group-hover:text-emerald-400">
                {item.nameBn}
              </span>
              <span className="text-slate-300 font-medium">
                {priceBn} ৳/{unitBn}
              </span>
              <span
                className={`inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded ${
                  isUp
                    ? "text-rose-400 bg-rose-950/60"
                    : isDown
                    ? "text-emerald-400 bg-emerald-950/60"
                    : "text-slate-400 bg-slate-800"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "—"} {pctBn}%
              </span>
            </Link>
          );
        })}
      </Marquee>
    </div>
  );
}


"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toBengaliNumber, getUnitLabelBn } from "@/lib/utils";

export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pctBn = toBengaliNumber(Math.abs(product.change?.pct || 0));
  const priceBn = toBengaliNumber(product.today);
  const unitBn = getUnitLabelBn(product.unit);

  return (
    <Link href={`/product/${product.id}`} className="block h-full group">
      <div className="h-full p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {product.image || "📦"}
              </div>

              <div className="flex flex-col items-start gap-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-100">
                  {product.categoryNameBn || product.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {unitBn}
                </span>
              </div>
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 border shrink-0 ${
                isUp
                  ? "bg-rose-50 text-rose-600 border-rose-200"
                  : isDown
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {isUp && "▲ "}
              {isDown && "▼ "}
              {!isUp && !isDown && "— "}
              {pctBn}%
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
            {product.nameBn}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 font-medium">
              আজকের দাম
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-slate-900">
                {priceBn} টাকা
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / {unitBn.replace("প্রতি ", "")}
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    </Link>
  );
}


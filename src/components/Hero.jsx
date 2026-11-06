"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full py-6 sm:py-8 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="w-full bg-[#fafcfa] border border-[#ebf1eb] rounded-[22px] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-[1.75fr_1fr] gap-6 lg:gap-8 items-center">
            <div className="flex flex-col items-start text-left">
              <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#e1f1e7] text-[#1f9652] text-xs font-semibold">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#1e2820] tracking-tight leading-tight mt-3 mb-2.5">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="text-xs sm:text-sm text-[#5a665e] leading-relaxed max-w-xl mb-6">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গত, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              <Link
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#0f8e45] hover:bg-[#0d7d3d] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                সব পণ্য দেখুন
              </Link>
            </div>

            <div className="w-full flex justify-center md:justify-end items-center">
              <div className="relative flex items-center justify-center md:justify-end w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]">
                <Image
                  src="/bazar-hero.png"
                  alt="বাজার দর ফলমূল ও শাকসবজি"
                  width={315}
                  height={263}
                  priority
                  className="w-auto h-[170px] sm:h-[190px] lg:h-[210px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

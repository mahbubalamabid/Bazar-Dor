import React from "react";

export default function CategoryLoading() {
  return (
    <main className="min-h-screen w-full py-8 sm:py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="h-4 w-40 bg-slate-200 rounded-md animate-pulse"></div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex items-center gap-5 sm:gap-6 animate-pulse">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200 shrink-0"></div>
          <div className="flex-1 space-y-3">
            <div className="h-7 w-48 bg-slate-200 rounded-md"></div>
            <div className="h-4 w-72 bg-slate-100 rounded-md"></div>
          </div>
        </div>

        <div className="h-14 bg-white rounded-2xl border border-slate-200/90 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="h-52 rounded-2xl bg-white border border-slate-200 animate-pulse p-5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
              </div>
              <div className="h-6 w-3/4 bg-slate-200 rounded-md"></div>
              <div className="h-8 w-1/2 bg-slate-200 rounded-md pt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


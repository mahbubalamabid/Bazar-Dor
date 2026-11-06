"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-client";
import { getBengaliDate } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const formattedDate = getBengaliDate();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories"
        );
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            setCategories(data);
          }
        }
      } catch (err) {
        console.error("Failed to load categories in navbar:", err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setDropdownOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  const user = session?.user;

  return (
    <header className="w-full bg-white border-b border-emerald-100/80 sticky top-0 z-50 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex flex-col">
            <Link
              href="/"
              className="flex items-center gap-2 group w-fit transition-transform hover:scale-[1.02]"
            >
              <span className="text-2xl sm:text-3xl leading-none">🛒</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight">
                বাজার দর
              </span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
              <span>🗓️</span>
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isPending ? (
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400">
                <span className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
                <span>লোড হচ্ছে...</span>
              </div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-emerald-50 transition-colors border border-slate-200"
                  aria-label="ইউজার মেনু"
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name || "ব্যবহারকারী"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <span className="hidden md:inline-block text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">সাইন ইন করা হয়েছে</p>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span>👤</span>
                      <span>প্রোফাইল</span>
                    </Link>

                    <Link
                      href="/profile/update-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <span>✏️</span>
                      <span>আপডেট প্রোফাইল</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <span>🚪</span>
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-lg transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        <nav
          aria-label="ক্যাটাগরি নেভিগেশন"
          className="flex items-center gap-2 sm:gap-4 py-2 overflow-x-auto scrollbar-none border-t border-slate-100"
        >
          <Link
            href="/"
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-colors ${
              pathname === "/"
                ? "bg-emerald-600 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <span>🏠</span>
            <span>সব পণ্য</span>
          </Link>

          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap px-3 py-1.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-emerald-600 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                <span className="text-sm leading-none">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}


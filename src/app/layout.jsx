import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Marque from "@/components/Marque";
import Footer from "@/components/Footer";

export const metadata = {
  title: "বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
  description:
    "বাংলাদেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ দরদাম জানুন এক ক্লিকেই।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 font-sans">
        <Navbar />
        <Marque />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#1e293b",
              color: "#f8fafc",
              fontSize: "14px",
              fontFamily: "'Hind Siliguri', sans-serif",
              borderRadius: "10px",
              padding: "12px 18px",
            },
          }}
        />
      </body>
    </html>
  );
}

import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "প্রোফাইল তথ্য পরিবর্তন — বাজার দর",
  description: "আপনার বাজার দর অ্যাকাউন্টের নাম ও তথ্য পরিবর্তন করুন।",
};

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile/update-profile");
  }

  const { user } = session;

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 py-12">
      <UpdateProfileForm user={user} />
    </main>
  );
}


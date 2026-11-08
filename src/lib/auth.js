import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "./db";

const socialProviders = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID.trim(),
    clientSecret: process.env.GOOGLE_CLIENT_SECRET.trim(),
  };
}

const githubClientId = (process.env.GITHUB_CLIENT_ID || process.env.GITHUB_ID || "").trim();
const githubClientSecret = (process.env.GITHUB_CLIENT_SECRET || process.env.GITHUB_SECRET || "").trim();

if (githubClientId && githubClientSecret) {
  socialProviders.github = {
    clientId: githubClientId,
    clientSecret: githubClientSecret,
  };
}

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL.replace(/\/+$/, "");
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/+$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
};

const trustedOrigins = [
  process.env.BETTER_AUTH_URL ? process.env.BETTER_AUTH_URL.replace(/\/+$/, "") : null,
  process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/+$/, "") : null,
  process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  "http://localhost:3000",
].filter(Boolean);

export const auth = betterAuth({
  baseURL: getBaseURL(),
  secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
  database: mongodbAdapter(db, {
    client,
  }),
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});

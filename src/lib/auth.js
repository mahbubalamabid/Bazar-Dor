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

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "default_secret_for_development_mode_only",
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
  database: mongodbAdapter(db, {
    client,
  }),
});


import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import payload, { Payload } from 'payload';
import type { InitOptions } from "payload/config";

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

// Create a nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

// Initialize a global cache for the Payload client
let cachedPayload = (global as any).payload

// If the cache is not yet initialized, initialize it
if (!cachedPayload) {
  cachedPayload = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

// Function to get the Payload client
export const getPayloadClient = async ({ initOptions }: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("Payload secret is missing!");
  }

  if (cachedPayload.client) {
    return cachedPayload.client;
  }

  if (!cachedPayload.promise) {
    cachedPayload.promise = payload.init({
      email: {
        transport: transporter,
        fromAddress: "onboarding@resend.dev",
        fromName: "Hoda Salah",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: (initOptions && initOptions?.express) ? false : true,
      ...(initOptions || {}),

    });
  }

  try {
    cachedPayload.client = await cachedPayload.promise;
  } catch (error: any) {
    cachedPayload.promise = null;
  }

  return cachedPayload.client
}
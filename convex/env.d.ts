declare global {
  namespace NodeJS {
    interface ProcessEnv {
      STRIPE_SECRET_KEY: string;
      STRIPE_PRICE_ID: string;
      HOSTING_URL: string;
      STRIPE_WEBHOOKS_SECRET: string;
    }
  }
}
export {};

// https://nuxt.com/docs/api/configuration/nuxt-config
const appURL = process.env.APP_URL ?? "https://localhost:3000";

export default defineNuxtConfig({
  // devtools: { enabled: true },
  ssr: true,
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],
  modules: [
    "@nuxt/image",
    "@vueuse/motion/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  typescript: {
    strict: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      appURL: appURL,
      apiURL: process.env.API_URL,
      mediaURL: process.env.MEDIA_URL,
    },
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    url: appURL,
  },
  routeRules: {
    "/api/v1/**": { proxy: `${process.env.API_URL}/**` },
  },
  image: {
    providers: {
      custom: {
        name: "customProvider",
        provider: "~/providers/customProvider.ts",
        options: {
          baseURL: process.env.MEDIA_URL,
        },
      },
    },
    provider: process.env.IMAGE_PROVIDER,
    // netlify: {
    //   baseURL: process.env.DOMAIN,
    // },
    // domains: [process.env.DOMAIN as string],
  },
});

/* eslint-disable sonarjs/no-duplicate-string */
import type { DefaultSeoProps } from "next-seo";

// https://github.com/garmeeh/next-seo#nextseo-options
export const defaultSEOConfig: DefaultSeoProps = {
  title: "InstaDevs",
  titleTemplate: "",
  defaultTitle: "InstaDevs",
  description:
    "The type of instagram where open-source devs celebrate their contributions",
  canonical: "https://pritishsamal.com",
  openGraph: {
    url: "https://pritishsamal.com",
    title: "InstaDevs",
    description:
      "The type of instagram where open-source devs celebrate their contributions",
    images: [
      {
        url: "https://res.cloudinary.com/pritish007/image/upload/v1644348821/Personal%20Portfolio/Favicon_nckr8a.png",
        alt: "sznm.dev og-image",
      },
    ],
    site_name: "InstaDevs",
  },
  twitter: {
    handle: "@PritishSamal11",
    cardType: "summary_large_image",
  },
};

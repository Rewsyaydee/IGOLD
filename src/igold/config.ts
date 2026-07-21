// ============================================================================
// IGOLD — Central application configuration
// ----------------------------------------------------------------------------
// Edit this file to control branding, developer credits, feature flags,
// madhhab defaults, media model defaults, and copyright notices.
// ============================================================================

import type { Madhhab } from "./madhhab";
import type { MediaModel } from "./mediaRegistry";

export const APP_CONFIG = {
  /** Default madhhab shown on first visit. */
  defaultMadhhab: "shafii" as Madhhab,

  /** Default instructional model figure. */
  defaultModel: "default" as MediaModel,

  /** Feature flags — flip to enable/disable content modules. */
  features: {
    wudu: true,
    niyyah: true,
    janazah: false,
  },

  // ---- Developer (you) --------------------------------------------
  developer: {
    name: "Rusyaidi",
    website: "https://rewsyaydee.tech",
    websiteLabel: "rewsyaydee.tech",
  },

  // ---- Organization -----------------------------------------------
  org: {
    name: "IIUM",
    fullName: "International Islamic University Malaysia",
    url: "https://www.iium.edu.my",
    copyright: "IIUM",
  },

  // ---- Branding asset paths (relative to /public/) ----------------
  branding: {
    iiumLogo: "/branding/iium-logo.svg",
    iiumLogoWhite: "/branding/iium-logo-white.svg",
    favicon: "/favicon.png",
  },
} as const;

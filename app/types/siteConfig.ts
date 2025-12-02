import { z } from "zod";
import { addressZ, menuItemZ, socialLinkZ, timeArrayZ } from "./shared";
export const siteConfigZ = z.object({
  title: z.string().nullish(),
  url: z.string().url().nullish(),
  address: addressZ,
  phoneNumber: z.string().nullish(),
  email: z.string().email().nullish(),
  services: timeArrayZ.nullish(),
  socialLinks: z.array(socialLinkZ).nullish(),
  mainNavigation: z
    .array(
      menuItemZ.extend({
        nestedRoutes: z.array(menuItemZ.nullish()).nullish(),
      })
    )
    .nullish(),
  footerText: z.string().nullish(),
});

export type SiteConfigDocument = z.infer<typeof siteConfigZ>;

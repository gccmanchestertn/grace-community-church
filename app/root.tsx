import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunctionArgs, json } from "@vercel/remix";
import font from "@fontsource-variable/dm-sans/standard.css?url";
import styles from "~/styles/tailwind.css?url";
import {
  frontendUrl,
  isStegaEnabled,
  studioUrl,
} from "./sanity/projectDetails";
import { Suspense, useState } from "react";
import VisualEditing from "./components/VisualEditing";
import { SITE_CONFIG_QUERY } from "./sanity/queries";
import { loadQuery } from "./sanity/loader.server";
import { SiteConfigDocument, siteConfigZ } from "./types/siteConfig";
import { useQuery } from "./sanity/loader";
import { Layout } from "./components/Layout";

declare global {
  const grecaptcha: any;
}
export type RootLoaderWithData = typeof loader;
export type DropdownState = "open" | "closed";
export interface OutletContext {
  dropdownState: DropdownState;
  changeDropdownState: (id: string) => void;
  closeDropdown: () => void;
  activeId?: string;
}
export const links = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: font },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const stegaEnabled = isStegaEnabled(request.url);
  const { pathname } = new URL(request.url);
  const isStudioRoute = pathname.startsWith("/studio");
  const SERMON_AUDIO_BASE_URL = process.env.SERMON_AUDIO_BASE_URL!;
  const SERMON_AUDIO_BROADCAST_ID = process.env.SERMON_AUDIO_BROADCAST_ID!;

  const webcastInProgress: boolean = await fetch(
    `${SERMON_AUDIO_BASE_URL}/v2/node/broadcasters/${SERMON_AUDIO_BROADCAST_ID}`,
    {
      headers: {
        "X-Api-Key": process.env.SERMON_AUDIO_API_KEY!,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.webcastInProgress)
    .catch((err) => console.log(err));

  const initial = await loadQuery<SiteConfigDocument>(
    SITE_CONFIG_QUERY,
    {},
    {
      perspective: stegaEnabled ? "previewDrafts" : "published",
    }
  ).then((res) => ({
    ...res,
    data: res.data ? siteConfigZ.parse(res.data) : undefined,
  }));

  return json({
    webcastInProgress,
    gaTrackingId: process.env.GA_TRACKING_ID,
    initial,
    query: SITE_CONFIG_QUERY,
    params: {},
    sanity: {
      isStudioRoute,
      stegaEnabled,
    },
    ENV: {
      GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY!,
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID!,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET!,
      SANITY_STUDIO_API_VERSION: process.env.SANITY_STUDIO_API_VERSION!,
      // URL of the Frontend that will be loaded into Presentation
      SANITY_FRONTEND_URL: frontendUrl,
      // URL of the Studio to allow requests from Presentation
      SANITY_STUDIO_URL: studioUrl,
    },
  });
};

export default function App() {
  const { sanity, webcastInProgress, ENV, initial, query, params , gaTrackingId} =
    useLoaderData<typeof loader>();

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <Meta />
        <Links />
      </head>
      <body
        id="scrollable"
        className="bg-cream font-sans flex flex-col min-h-dvh"
      >
        {process.env.NODE_ENV === `development` || !gaTrackingId ? null : (
          <>
            {/* <script src={`https://www.google.com/recaptcha/api.js?render=${ENV.GOOGLE_RECAPTCHA_SITE_KEY}`}></script> */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        {sanity.isStudioRoute ? (
          <Outlet />
        ) : (
          <>
            <Layout
              webcastInProgress={webcastInProgress}
              siteConfig={loading || !data ? initial.data : data}
            >
              <Outlet />
            </Layout>
          </>
        )}
        {/* <Outlet /> */}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        {!sanity.isStudioRoute && sanity.stegaEnabled ? (
          <Suspense>
            <VisualEditing studioUrl={ENV.SANITY_STUDIO_URL} />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}

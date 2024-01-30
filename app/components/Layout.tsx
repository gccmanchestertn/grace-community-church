import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { SiteConfigDocument } from "~/types/siteConfig";
import { Link } from "@remix-run/react";

export type LayoutProps = PropsWithChildren<
{siteConfig?: SiteConfigDocument}>

export const Layout = ({children, siteConfig}: LayoutProps) => {
	const {mainNavigation, ...rest} = siteConfig || {};
  return (
    <>
      <Header navigation={mainNavigation} />
      <main>{children}
				{/* <pre>{JSON.stringify(siteConfig, null, 2)}</pre> */}
			</main>
      <Footer {...rest} />
    </>
  );
};

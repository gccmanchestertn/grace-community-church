import { Await, useLoaderData } from "@remix-run/react";
import { defer, LoaderFunctionArgs, type MetaFunction } from "@vercel/remix";
import { Suspense } from "react";
import { Page } from "~/components/Page";
import { HeroModule } from "~/components/modules/HeroModule";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { HOME_PAGE_QUERY, HOME_PAGE_QUERY_WITH_TYPE } from "~/sanity/queries";
import { HomeDocument, homeZ } from "~/types/home";
import { PageDocument } from "~/types/page";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { pathname } = new URL(request.url);
  const otherModulesPromise = loadQuery<HomeDocument>(
    HOME_PAGE_QUERY,
    {},
    {
      perspective: "published",
    }
  ).then((res) => ({
    ...res,
    data: res ? homeZ.parse(res.data) : null,
  }));
  const heroData = await loadQuery<HomeDocument>(
    HOME_PAGE_QUERY_WITH_TYPE,
    { type: "hero" },
    {
      perspective: "published",
    }
  ).then((res) => ({
    ...res,
    data: res ? homeZ.parse(res.data).pageLayouts.modules?.[0] : null,
  }));

  return defer({
    heroData: heroData,
    params: { type: "hero" },
    query: HOME_PAGE_QUERY_WITH_TYPE,
    pathname,
    otherModulesPromise,
  });
};

export default function Index() {
  const { heroData, query, params, otherModulesPromise } =
    useLoaderData<typeof loader>();

  const { data, loading } = useQuery<typeof heroData.data>(query, params, {
    initial: heroData,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HeroModule {...data} />
      <Suspense fallback="Loading page">
        <Await resolve={otherModulesPromise}>
          {(props) =>{
						const { data } = props as unknown as {data: PageDocument}
						return (

							<Page pageLayouts={data?.pageLayouts} />
						)}}
        </Await>
      </Suspense>
    </>
  );
}

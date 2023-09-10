import Head from "next/head";

export function MainHead({ title: _title }: { title?: string }) {
  const title = _title ?? "Open Path Platform";

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="title" content="Open Path Platform" />
      <meta name="description" content="Make paths navigable for all." />
      <meta name="keywords" content="opp, open, path, navigate" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      {/* <meta property="og:url" content="http://my.site.com" />
      <meta property="og:image" content="http://my.site.com/images/thumb.png" /> */}
      <meta property="og:description" content="Make paths navigable for all." />
    </Head>
  );
}

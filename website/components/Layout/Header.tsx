/** @format */

import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

export const siteTitle = "xryuseix Sample Website";

const Header: React.FC<Props> = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/research/favicon.ico" />
      <meta name="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="og:image"
        content="https://raw.githubusercontent.com/xryuseix/research/main/website/public/ogp.png"
      />
    </Head>
  );
};

export default Header;

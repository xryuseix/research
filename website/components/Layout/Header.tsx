/** @format */

import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Header: React.FC<Props> = ({ title, description }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/research/favicon.ico" />
    </Head>
  );
};

export default Header;

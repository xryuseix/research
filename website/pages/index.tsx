import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { Layout } from '../components/Layout';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout home>
      <Head>
        <title>Research Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/research/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <Link href="/apps/calc">Next.js!</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </main>
    </Layout>
  )
}

export default Home

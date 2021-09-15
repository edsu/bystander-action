import Head from 'next/head'

import styles from '../styles/layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bystander Intervention and Race</title>
      </Head>
      <header>
        <h1>Bystander Intervention and Race</h1>
        <h2>Social Media Conversations</h2>
      </header>
      <main>
        { children }
      </main>
    </div>
  )
}
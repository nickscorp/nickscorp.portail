import Head from 'next/head'
import styles from './index.module.scss'
import HomeHeader from '../components/HomeHeader'
import MessagePopup from '../components/MessagePopupWidget'
import MessagerieWidget from '../components/MessagerieWidget'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nick's Corp</title>
        <meta name="description" content="Nick's corp services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeHeader/>

      <main className={styles.main}>
        <section className={styles.section1}>
          {/* <div className={styles.messages}>
            <MessagerieWidget/>
          </div> */}
          <div className={styles.textes}>
            <span>Portons ensemble le futur</span>
            <div className={styles.decouvrir}>
              <span>Découvrir</span>
            </div>
          </div>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="white" points="0,100 100,0 100,100"/>
          </svg>
        </section>
        <section className={styles.section2}>

        </section>
        <MessagePopup/>
      </main>

      <footer className={styles.footer}>
      
      </footer>
    </div>
  )
}

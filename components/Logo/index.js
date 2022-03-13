import React from 'react'
import styles from './index.module.scss'
export default function Logo() {
  return (
    <div className={styles.logoContainer}> 
        <div className={styles.logo}>
            {/* <Image width={20} height={20} src={logo} layout='intrinsic'/> */}
            <div>Nick's Corp</div>
        </div>
        <div className={styles.slogan}>
            <p>Load evolution</p>
        </div>
    </div>
  )
}

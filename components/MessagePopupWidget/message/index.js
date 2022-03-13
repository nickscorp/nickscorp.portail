import React from 'react'
import styles from '../index.module.scss'

export function User1Message({children}) {
  return (
    <div className={styles.msgUser1}>{children}</div>
  )
}

export function User2Message(props) {
    return (
        <div className={styles.msgUser2}>
            <div className={styles.txt}>{props.children}</div>
        </div>
    )
}
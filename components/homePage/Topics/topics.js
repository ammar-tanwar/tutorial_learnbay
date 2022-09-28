import Link from 'next/link';
import React from 'react'
import styles from './Topics.module.css'

function Topics({categoryPostTopic}) {
  return (
    <section className={styles.topics}>
        <h2>Our Topics</h2>
<div className={styles.container} >
        {categoryPostTopic.map((categoryPostTopic, index) => {
            let murl = categoryPostTopic.title.replace(" ", "-");
            let url = `/${murl}/getting-started/`;
            return (
        <div className={styles.boxes} key={index}>
            <Link href={url}><div className={styles.boxesInner}>
                <img src={categoryPostTopic.img}></img>
                <h2>{categoryPostTopic.title}</h2>
                <p>{categoryPostTopic.tagDes}</p>
            </div></Link>
        </div>
            )
        })}
    </div>
    </section>
  )
}

export default Topics
import React from "react";
import { FaYoutube } from "react-icons/fa";
import styles from "./thirdSection.module.css";
import { videos } from "./ThirdSectionDetails";
import Link from "next/link";

function ThirdSection() {
  return (
    <section className={styles.third}>
      <h2>Watch Our Videos</h2>
    <div className={styles.back}>
      {videos.map((videos, index) => {
        return (
      <Link href={videos.link} key={videos.id} passHref>
        <div className={styles.innerBox}>
          <div className={styles.innerBoxF}>
            <p>{videos.title}</p>
            <FaYoutube className={styles.icon} />
          </div>
          <img src={videos.img}></img>
        </div>
      </Link>
    )
        })}
    </div>
    </section>
  );
}

export default ThirdSection;

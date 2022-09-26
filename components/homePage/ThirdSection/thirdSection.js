import React from "react";
import { FaYoutube } from "react-icons/fa";
import styles from "./thirdSection.module.css";
import { videos } from "./ThirdSectionDetails";

function ThirdSection() {
  return (
    <section className={styles.third}>
      <h2>Watch Our Videos</h2>
    <div className={styles.back}>
      {videos.map((videos, index) => {
        return (
      <a href={videos.link} key={videos.id}>
        <div className={styles.innerBox}>
          <div className={styles.innerBoxF}>
            <p>{videos.title}</p>
            <FaYoutube className={styles.icon} />
          </div>
          <img src={videos.img}></img>
        </div>
      </a>
    )
        })}
    </div>
    </section>
  );
}

export default ThirdSection;

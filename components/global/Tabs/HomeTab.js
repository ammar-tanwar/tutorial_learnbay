import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Tabs.module.css";

const HomeTabs = ({ tag }) => {
  console.log(tag, "HOmeTabs");
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className={styles.MenuTabs}>
        <div className={styles.leftPanel}>
          {tag.map((posts, i) => {
            console.log(posts.title);
            let url = `/${posts.title}/1-getting-started`;

            return (
              <Link href={url} key={i}>
                <span className={styles.span}>
                  {posts.title}
                  <FaArrowRight />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeTabs;

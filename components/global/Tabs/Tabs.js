import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

import styles from "./Tabs.module.css";

const Tabs = ({ tags }) => {
  console.log(tags, "Tabs");
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
          {tags.map((posts, i) => {
            console.log(posts.title);
            let url = `/tutorial/${posts}/1-getting-started`;

            return (
              <Link href={url} key={i}>
                <span className={styles.span}>
                  {posts}
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

export default Tabs;

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import TabData from "./TabData";
import styles from "./Tabs.module.css";

const Tabs = ({ tag }) => {
  const [viewAll, setViewAll] = useState(true);
  const [oneYear, setOneYear] = useState(false);
  const [nonTech, setNonTech] = useState(false);
  const [Guarantee, setGuarantee] = useState(false);
  const [Stack, setStack] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
    if (width > 481) {
      setMobile(false);
    }
  });

  return (
    <div className="wrapper">
      <div className={styles.MenuTabs}>
        <div className={styles.leftPanel}>
          {tag.map((posts, i) => {
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

export default Tabs;

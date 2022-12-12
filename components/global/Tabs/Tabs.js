import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import TabData from "./TabData";
import { useRouter } from "next/router";
import styles from "./Tabs.module.css";

const Tabs = ({ tag }) => {
  const router = useRouter();

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
  console.log(tag);
  useEffect(() => {
    if (router.pathname === "/") {
      setStack(true);
    } else {
      setStack(false);
    }
  }, []);
  return (
    <div className="wrapper">
      <div className={styles.MenuTabs}>
        <div className={styles.leftPanel}>
          {tag.map((posts, i) => {
            let url = `/${posts.title}/1-getting-started`;
            let iUrl = `/${posts}/1-getting-started`;

            return Stack ? (
              <Link href={url} key={i}>
                <span className={styles.span}>
                  {posts.title}
                  <FaArrowRight />
                </span>
              </Link>
            ) : (
              <Link href={iUrl} key={i}>
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

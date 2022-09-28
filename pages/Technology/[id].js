import React, { useState } from "react";
import {
  getSortedTechnologyData,
  getAllTechnologyIds,
  getTechnologyData,
} from "../../lib/posts";
import Footer from "../../components/global/footer/Footer";
import Navbar from "../../components/global/navbar/Navbar";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/blog.module.css";
import { FcShare, FcLike } from "react-icons/fc";

export default function CategoryBlog({ postData, posts }) {
  let singleCategoryPost = posts.map((post) => {
    return post.category;
  });
  let data = []
  posts.forEach((tabledata, id) => {
    data.push ({id:tabledata.title,
      dataTable:tabledata.tableData,
    open:id === 0 ? true : false
  })
  })
  
  const [state, setState] = useState(data);
  const handleChange = (index) => {
    setState(
      state.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };
  let categoryPostTag = Array.from(new Set(singleCategoryPost));
  return (
    <>
      <section className={styles.MainS}>
        <Head>
          <link
            rel="icon"
            href="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/Learnbay-Favicon-L.png"
          />

          <title>{postData.title}</title>
        </Head>
        <Navbar tag={categoryPostTag} />
        <div className={styles.banner}>
          <div className={styles.divFirst}>
            <Image
              src={postData.img}
              alt="Learnbay"
              layout="intrinsic"
              width="765"
              height="516"
            ></Image>
          </div>
          <div className={styles.divSecond}>
            <p className={styles.headP}>{postData.infoP}</p>
            <h2 className={styles.headH2}>
              {postData.mainH1}
              <span className={styles.spanH2}>{postData.spanH2}</span>
            </h2>
            <p className={styles.bottomP}>{postData.bottomP}</p>
            <div className={styles.imgText}>
              <div className={styles.imgC}>
                <Image
                  src={postData.imgC}
                  alt="Learnbay"
                  layout="intrinsic"
                  width="71"
                  height="71"
                ></Image>
                <div className={styles.insDate}>
                  <p className={styles.PH}>{postData.PH}</p>
                  <p className={styles.pD}>{postData.pD}</p>
                </div>
              </div>
              <div className={styles.shareLikeDiv}>
                <FcLike className={styles.shareLike} />
                <FcShare className={styles.shareLike} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.Content}>
          <div className={styles.left}>
          {state.map((table, i) => {
              return (
                <div key={i}>
                <p onClick={()=> handleChange(i) } className={styles.heading}>{table.id}</p>
                <div className={styles.divInner}>
                {table.open ? <p className={styles.Hcontent}>{table.dataTable.map((dataT, i) => {
                  return dataT;
                })}</p>:""}
                </div>
                </div>
              );
            })}
            <div className={styles.white} />
            {/* <div className={styles.table}>
              <div className={styles.contentT}>
                {postData.table.map((table, i) => {
                  const removeSpecial = table.replace(
                    /[&\/\\#,+()$~%.'":*?<>{}]/g,
                    ""
                  );

                  const uMake = removeSpecial
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                  const url = `#${uMake}`;
                  return (
                    <div key={i}>
                      <div className={styles.numberBack}>
                        <span className={styles.number}>{i}</span>
                      </div>
                      <span>
                        <p>
                          <Link href={url}>{table}</Link>
                        </p>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>
          <div className={styles.right}>
            <article dangerouslySetInnerHTML={{ __html: postData.body }} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllTechnologyIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getSortedTechnologyData();
  const postData = getTechnologyData(params.id);
  return {
    props: {
      postData,
      posts,
    },
  };
}

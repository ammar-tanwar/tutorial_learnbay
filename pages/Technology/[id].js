import React from "react";
import { getSortedTechnologyData, getAllTechnologyIds, getTechnologyData } from "../../lib/posts";
import Footer from "../../components/global/footer/Footer";
import Navbar from "../../components/global/navbar/Navbar";
import Head from "next/head";
import styles from "../../styles/blog.module.css";
import { FcShare, FcLike } from "react-icons/fc";

export default function CategoryBlog({ postData, posts }) {
  let singleCategoryPost = posts.map((post) => {
    return post.category;

  });
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
          <img src={postData.img} alt="Learnbay"></img>
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
              <img src={postData.imgC}></img>
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

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllPostIds, getPostData, getSortedPostsData } from "../lib/posts";
import Head from "next/head";
import styles from "../styles/blog.module.css";
import { BsDot } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import Footer from "../components/global/footer/Footer";
import Navbar from "../components/global/navbar/Navbar";
import { FcShare, FcLike } from "react-icons/fc";

export default function Post({ postData, posts }) {
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

      <main>
        <div className={styles.Open}>
          <div className={styles.headerInfo}>
            <h1>{postData.mainH1}</h1>
            <span>
              By <strong>{postData.author}</strong> <BsDot className="bIcon" />
              Published in <strong>{postData.tag}</strong>{" "}
              <BsDot className="bIcon" />
              <strong className={styles.time}>{postData.time}</strong>
            </span>
          </div>
          <div className={styles.bodyInfo}>
            <div className={styles.rightInfo}>
              <div className={styles.blogdiv1}>
                <div className={styles.table}>
                  <h5>Table of content</h5>
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
                  <h5>Related Posts</h5>
                  <div className={styles.relatePost}>
                    {posts.map((post, i) => {
                      return (
                        <div className={styles.rPost} key={i}>
                          <a href={post.id}>
                            {" "}
                            <h5>{post.title}</h5>
                          </a>
                          <span>
                            {post.author}
                            <p className={styles.rPostD}>
                              <IoTimeOutline className={styles.timeIcon} />
                              {post.date}
                            </p>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.blogdiv1}>
              <div className={styles.leftInfo}>
                <article dangerouslySetInnerHTML={{ __html: postData.body }} />
                <hr />
                <div className={styles.tag}>
                  {/* <div className={styles.lSide}>
                  <p>Tags</p>{" "}
                  {postData.tag.map((tag, i) => {
                    return <span key={i}>#{tag}</span>;
                  })}
                </div> */}
                </div>

                <hr />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = getSortedPostsData();
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
      posts,
    },
  };
}

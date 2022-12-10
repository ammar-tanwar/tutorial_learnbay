import React from "react";
import { getSortedPostsData } from "../lib/posts";
import styles from "../styles/blogM.module.css";
import Head from "next/head";
import { sortByDate } from "../utils";
import Footer from "../components/global/footer/Footer";
import Course from "../components/homePage/Course/Course";
import Navbar from "../components/global/navbar/Navbar";
import HeroSection from "../components/homePage/HeroSection/HeroSection";
import ThirdSection from "../components/homePage/ThirdSection/ThirdSection";
import Topics from "../components/homePage/Topics/Topics";

export default function blog({ allPostsData }) {
  let navCategory;
  allPostsData.map((navDetails, i) => {
    navCategory = navDetails.folderTopicData;
  });

  return (
    <>
      <Head>
        <title>Learnbays Topics</title>
        <meta name="description" content="Learnbay Blogs" />
        <link href="/Learnbay-Favicon-L.png" />
        <meta
          name="google-site-verification"
          content="q2xA2OZrvhAj8r1YGNF_3x5m5GuWCqo9rNb7atG4mXU"
        />
        <link
          rel="icon"
          href="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/Learnbay-Favicon-L.png"
        />
      </Head>
      <Navbar tag={navCategory} dataScience={true} />
      <HeroSection
        dataScience={true}
        radio={true}
        mTitle="Investing in Knowledge and"
        spanMTitleText="Your Future"
        title="Investing in Knowledge and"
        spanTitleText="Your Future"
        desc="With new capstone projects, learn how to apply your previous domain expertise to make a successful transition."
        src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/tutorial/tutorial.png"
        width="914"
        height="1002"
        alt="data science course"
      />
      <Topics categoryPostTopic={navCategory} />
      <ThirdSection />
      <Course />
      <Footer />
    </>
  );
}

export async function getStaticProps(_context) {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData: allPostsData.sort(sortByDate),
    },
  };
}

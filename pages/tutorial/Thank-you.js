import React from "react";
import styles from "../../styles/ThankYou.module.css";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../../components/global/navbar/navbar";
import Footer from "../../components/global/footer/footer";
const ThankYou = () => {
  return (
    <div className={styles.main}>
      <Head>
        <title>Thank you!</title>
        <meta name="description" content="Thank you!" />
        <link rel="icon" href="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/Learnbay-Favicon-L.png" />
        <link rel="canonical" href="https://www.learnbay.co/Thank-you" />
      </Head>
      <Navbar popup={true} dataScience={true} radio={true}/>
      <section className={styles.mains}>
        <div className={styles.Back}>
          <h4>
            Thank you!
            <br />
            We Received your request and look forward to getting in touch soon.
          </h4>
          <div>
            <Image
              src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/thank-header.png"
              width="522"
              height="380"
              layout="intrinsic"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ThankYou;

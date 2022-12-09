import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import "swiper/css";
import "swiper/css/navigation";
import { FaUserGraduate, FaDownload } from "react-icons/fa";
import Image from "next/image";
import Popup from "/components/global/Popup/Popup";
import Form from "/components/global/Form/Form";

const HeroSection = ({
  deskTopPara,
  title,
  mTitle,
  spanTitleText,
  spanMTitleText,
  desc,
  mTopPara,
  width,
  height,
  src,
  alt,
  radio,
  srcD,
  deskTopPara1,
  mTopPara1,
  dataScience, fullStack,
}) => {
  const [mobile, setMobile] = useState(false);
  const [show, setShow] = useState(false);
  const [popups, setPopups] = useState(false);

  const popupShow = () => {
    setPopups(true);
  };
  const showMenu = () => {
    setShow(!show);
  };

  useEffect(() => {
    let width = window.innerWidth;
    if (width < 481) {
      setMobile(true);
    }
  });

  return (
    <section className={styles.wrapper}>
      <Popup trigger={popups} setTrigger={setPopups} className="popupModal">
        <div className="leftPopup">
          <div className="whiteP" />
        </div>
        <div className="RightPopup">
          <h5>Apply For Counselling</h5>
          {/* <p>Fill the below details to get started</p> */}
          <Form popup={true} setTrigger={setPopups} radio={radio} fullStack={fullStack} dataScience={dataScience} />
        </div>
      </Popup>
      <div className={styles.left}>
        {mobile ? (
          <h1>
            {mTitle} <br /> <span>  {spanMTitleText}</span>
          </h1>
        ) : (
          <h1>
            {title} <br /> <span>  {spanTitleText}</span>
          </h1>
        )}

        <p className={styles.pBot}>{desc}</p>
        <div className={styles.ButtonDiv}>
          <div className={styles.btnWrapper}>
            <button onClick={popupShow}>
              Apply for Counselling
              <FaUserGraduate style={{ marginLeft: "10px" }} />
            </button>
          </div>
          <div className={styles.boxShape}>
            <div className={styles.boxStyle}>
              <Image src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/tutorial/arrow.png" width="40px" height="40px"></Image>
              <p className={styles.boxP}>10K+</p>
              <p className={styles.boxpp}>Trusted Learners</p>
            </div>
            <div className={styles.boxStyle}>
              <Image src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/tutorial/circle.png" width="40px" height="40px"></Image>
              <p className={styles.boxP}>100%</p>
              <p className={styles.boxpp}>Targeted Syllabus</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Image
          src={src}
           alt={alt}
          layout="intrinsic"
          width={width}
          height={height}
        />
      </div>
    </section>
  );
};

export default HeroSection;

import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./navbar.module.css";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import Tabs from "../Tabs/Tabs";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import searchResults from "../searchResults/searchResults";

const navbar = ({ tag }) => {
  const [icon, setIcon] = useState(false);
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchresults] = useState([]);

  useEffect(() => {
    console.log("inside");
    const getResults = async () => {
      if (searchTerm === "") {
        setSearchresults([]);
      } else {
        const res = await fetch("/api/search",{
          method: "POST",
      body: {q:searchTerm},
      headers: {
        "Content-Type": "application/json",
      },
        }).then((t) => t.json());
        console.log(res, "reess");
        const { results } = await res.json();
        setSearchresults(results);
      }
    };
    getResults();
  }, [searchTerm]);

  console.log(setSearchresults);

  const handleIcon = (data) => {
    setIcon(data);
  };
  const showMenu = () => {
    setShow(!show);
  };
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
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.logoN}>
            <div className={show ? styles.mobileWrapper : styles.hide}>
              <div className={styles.mobileMenu}>
                <span>
                  <Link href="/">Home</Link>
                </span>
                <span>
                  <Link href="https://www.learnbay.co/about-us">About Us</Link>
                </span>
                <span>
                  <Link href="https://blog.learnbay.co/">Blog</Link>
                </span>
                <span>
                  <Link href="https://www.learnbay.co/contact-us">
                    Contact Us
                  </Link>
                </span>
              </div>
            </div>
            <GiHamburgerMenu
              className={styles.ham}
              onClick={() => {
                showMenu();
                setIcon(false);
              }}
            />
            <a href="/" className={styles.img}>
              <Image
                src="https://learnbay-wb.s3.ap-south-1.amazonaws.com/main/Learnbay-Logo.webp"
                alt="Learnbay"
                quality={100}
                objectFit="contain"
                width="230"
                height="60px"
              />
            </a>{" "}
            {mobile ? (
              <button
                onClick={() => {
                  setIcon(!icon);
                  setShow(false);
                }}
                className="hoverBtn"
              >
                Topic
                {icon ? (
                  <FaChevronUp className={styles.icon} />
                ) : (
                  <FaChevronDown className={styles.icon} />
                )}
              </button>
            ) : (
              <button
                onMouseEnter={() => setIcon(true)}
                onMouseOver={() => setIcon(true)}
                onClick={() => {
                  setIcon(!icon);
                  setShow(false);
                }}
                className="hoverBtn"
              >
                Topic
                {icon ? (
                  <FaChevronUp className={styles.icon} />
                ) : (
                  <FaChevronDown className={styles.icon} />
                )}
              </button>
            )}
            {icon ? (
              <div
                className={styles.megaMenu}
                onMouseOver={() => setIcon(true)}
                onMouseLeave={() => setIcon(false)}
              >
                <Tabs handleIcon={handleIcon} tag={tag} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className={styles.right}>
          <span>
            <Link href="/">Home</Link>
          </span>
          <span>
            <Link href="https://www.learnbay.co/about-us">About Us</Link>
          </span>
          <span>
            <Link href="https://blog.learnbay.co/">Blog</Link>
          </span>
          <span>
            <Link href="https://www.learnbay.co/contact-us">Contact Us</Link>
          </span>
          <div className={styles.search}>
            <form>
              <input
                type="search"
                name="search"
                id="search"
                className={styles.input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Topics Here"
              />
              <FaSearch className={styles.iconSearch} />
            </form>
          </div>
          <button>
            Log In
            <FaArrowRight className={styles.icon} />
          </button>
        </div>
      </nav>
      {/* <div>
    <searchResults results={searchResults} /></div> */}
    </div>

  );
};

export default navbar;

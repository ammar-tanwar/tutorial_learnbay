import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./navbar.module.css";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import Tabs from "../Tabs/Tabs";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResults from "../searchResults/searchResults";
import { useRouter } from "next/router";
import HomeTabs from "../Tabs/HomeTab";

const Navbar = ({ tag }) => {
  const router = useRouter();

  const [icon, setIcon] = useState(false);
  const [show, setShow] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchresults] = useState([]);
  const [Stack, setStack] = useState(false);
  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === "") {
        setSearchresults([]);
      } else {
        const result = await fetch("/api/search", {
          method: "POST",
          body: JSON.stringify({ q: searchTerm }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((t) => t.json());

        setSearchresults(result);
      }
    };
    getResults();
  }, [searchTerm]);

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
                Topics
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
                Topics
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
                <HomeTabs handleIcon={handleIcon} tag={tag} />
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
            <form method = "get" title = "Search Form" action="https://cse.google.com/cse/publicurl">
              {/* <input
                type="search"
                name="search"
                id="search"
                className={styles.input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Topics Here"
              /> */}
            <input type="text" className={styles.input} id="q" name="q" title="Search this site" alt="Search Text" placeholder='Search for blog...'/>
            <input type="hidden" id="cx" name="cx" value="446f84458a10944b2" />
            <input type="image" className={styles.iconSearch} id="searchSubmit" name="submit" src="https://i.ibb.co/CvcDr91/search.png" alt="Go" title="Submit Search Query" />
            {/* <FaSearch className={styles.iconSearch} /> */}
            </form>
          </div>
          {/* <button>
            Log In
            <FaArrowRight className={styles.icon} />
          </button> */}
        </div>
      </nav>
      {/* <div>
        <SearchResults results={searchResults} />
      </div> */}
    </div>
  );
};

export default Navbar;

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

const PageNavbar = ({ tag }) => {
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
  useEffect(() => {
    if (router.pathname === "/") {
      setStack(true);
    } else {
      setStack(false);
    }
  }, [router.pathname]);
  const handleIcon = (data) => {
    setIcon(data);
  };
  const showMenu = () => {
    setShow(!show);
  };

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
                  <Link href="https://www.learnbay.co/demo">Demo</Link>
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
                <Tabs handleIcon={handleIcon} tags={tag} />
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
            <Link href="https://www.learnbay.co/demo">Demo</Link>
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
          {/* <button>
            Log In
            <FaArrowRight className={styles.icon} />
          </button> */}
        </div>
      </nav>
      <div>
        <SearchResults results={searchResults} />
      </div>
    </div>
  );
};

export default PageNavbar;

import React from "react";
import styles from "./searchResults.module.css";
import Link from "next/link";
export default function SearchResults({ results }) {
  if (results.length === 0) return <></>;
  return (
    <div className={styles.main}>
      <div className={styles.mainInner}>
        <h2 className={styles.mainh2}>{results.length} Results</h2>
        {results.map((result, index) => {
          const removeSpecial = result.frontmatter.title.replace(
            /[&\/\\#,+()$~%.'":*?<>{}]/g,
            ""
          );

          const uMake = removeSpecial.toLowerCase().replace(/\s+/g, "-");

          const url = `${uMake}`;
          return (
            <Link href={url} key={index}>
              <p key={result} className={styles.para}>
                {result.frontmatter.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

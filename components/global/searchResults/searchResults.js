import React from "react";
import styles from "./searchResults.module.css";

export default function SearchResults({ results }) {
  return (
    <div className={styles.main}>
      <div className={styles.mainInner}>
        <h2 className={styles.mainh2}>{results.length} Results</h2>
        {results.map((result, index) => {
          return (
            <p key={index} className={styles.para}>
              {result.frontmatter.title}
            </p>
          );
        })}
      </div>
    </div>
  );
}

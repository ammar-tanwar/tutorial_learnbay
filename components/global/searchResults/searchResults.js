import React from 'react';
import Post from '../../../pages/Data Science/[id]';
import styles from "./searchResults.module.css";

export default function searchResults({results}) {
  return (
    <div className={styles.main}>
        <div className={styles.mainInner}>
            <h2 className={styles.mainh2}>{results.length} Results</h2>
            {results.map((result, index) => (
                <Post key={index} post={result} />
            ))}
        </div>
    </div>
  )
}

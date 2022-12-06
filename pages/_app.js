import "../styles/globals.css";
import React, { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   fetch("/api/v1/generatePage", {
  //     method: "GET",
  //   });
  // });
  return <Component {...pageProps} />;
}

export default MyApp;

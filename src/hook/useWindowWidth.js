import { useState,  useEffect } from "react";

export function useWindowWidth() {

  const [windowWidth, setWindowWidth] =  useState(window.innerWidth);


   useEffect(() => {
    let timeout;
    function handleResize() {
      if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          setWindowWidth(window.innerWidth);
        }, 100);

    };
    window.addEventListener('resize', handleResize, false);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

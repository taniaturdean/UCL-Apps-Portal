import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollTo = () => {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        // if not a hash link, scroll to top
        if (hash === '') {
          window.scrollTo(0, 0);
        }
        // else scroll to element
        else {
          setTimeout(() => {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            // if element exists, scroll to it
            if (element) {
              element.scrollIntoView();
            } else {
              console.log(`element "${id}" does not exist`);
            }
          }, 0);
        }
      }, [pathname, hash, key]);
}

export default useScrollTo
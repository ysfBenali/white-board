import { useEffect, useState } from "react";

interface IWindowSize {
    width: undefined | number,
    height: undefined | number,
}

const useWindowSize = () : IWindowSize => {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: undefined,
        height: undefined,
      });

      useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
    
        // Add event listener
        window.addEventListener("resize", handleResize);
    
        // Call handler right away so state gets updated with initial window size
        handleResize();
    
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }, []); 

      return windowSize;
};


export default useWindowSize;

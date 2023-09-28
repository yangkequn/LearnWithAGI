import React, { useState, useEffect } from 'react';

/**
 * ScrollingBanner component
 * 
 * Props:
 * - components: An array of React components to display in the banner.
 *   Example: [<Component1 />, <Component2 />]
 * 
 * - durations: An array of durations (in milliseconds) for how long each component should be displayed.
 *   Example: [1000, 9000] (This means Component1 will be displayed for 1 second, Component2 for 9 seconds)
 * 
 * Note: Ensure that the lengths of `components` and `durations` arrays are the same.
 */

const ScrollingBanner = ({ components, durations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkening, setIsDarkening] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const switchComponent = () => {
      if (isMounted) {
        setIsDarkening(true);

        setTimeout(() => {
          if (isMounted) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
            setIsDarkening(false);
          }
        }, 500); // half of 1 second to transition to the next banner
      }
    };

    const timer = setTimeout(switchComponent, durations[currentIndex]);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [currentIndex, components.length, durations]);

  return (
    <div className={`flex flex-col flex-wrap justify-start items-start w-full mt-2 gap-[7px] h-full overflow-hidden ${isDarkening ? 'animate-darken' : 'animate-brighten'}`}>
      {components[currentIndex]}
    </div>
  );
};
export default ScrollingBanner;
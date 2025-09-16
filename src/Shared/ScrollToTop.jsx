import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  // স্ক্রল করলে বাটন দেখা/লুকানো
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // স্ক্রল টু টপ ফাংশন
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll effect
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg hover:scale-110  text-white bg-primary/70 font-semibold hover:bg-primary/90 transition-transform duration-300 cursor-pointer"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;

import { useState, useEffect } from 'react';

const ScrollTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 500) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 500) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className="scrollTop dark:bg-white bg-gray-900 rounded-full focus:outline-none"
      onClick={scrollTop}
      style={{ display: showScroll ? 'flex' : 'none' }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 fill-current dark:text-gray-900 text-white"
        viewBox="0 0 24 24"
      >
        <path d="M7 11v13h2v-5h2v3h2v-7h2v9h2v-13h6l-11-11-11 11z" />
      </svg>
    </button>
  );
};

export default ScrollTop;

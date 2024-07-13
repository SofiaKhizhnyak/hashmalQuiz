import React, { useEffect } from "react";

const MathJax = ({ children }) => {
  useEffect(() => {
    window.MathJax.typeset();
  }, [children]);

  return <div>{children}</div>;
};

export default MathJax;

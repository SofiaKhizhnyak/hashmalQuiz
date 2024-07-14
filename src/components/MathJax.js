//this file is a helper component that will render the MathJax script and typeset the math expressions of the questions
import React, { useEffect } from "react";

const MathJax = ({ children }) => {
  useEffect(() => {
    window.MathJax.typeset();
  }, [children]);

  return <div>{children}</div>;
};

export default MathJax;

import React from "react";
import { useQuiz } from "../contexts/QuizContext";
import { HiOutlineHome } from "react-icons/hi";

function GoHomeButton() {
  const { dispatch } = useQuiz();

  const handleClick = () => {
    dispatch({ type: "restart" });
  };

  return (
    <button
      className="my-button go-home-button"
      onClick={handleClick}
      title="Restart quiz"
    >
      <HiOutlineHome />
    </button>
  );
}

export default GoHomeButton;
